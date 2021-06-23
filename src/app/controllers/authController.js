const User = require('../local-models').User
const Category = require('../remote-models').Category
const {
    getSubscription
} = require('../../utils/helper')
const {
    createAccessToken,
    validatePassword
} = require('../../utils/auth')
const { RandomOrderString, randomString } = require('../../utils/helper')

exports.signUp = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Email and Password Required'
        })
    }
    try {
        const user = await User.create(req.body)
        const token = createAccessToken(user)
        res.status(201).send({
            message: "User created",
            access_token: token
        })
    } catch (e) {
        console.error(e);
        res.status(409).send({
            message: "Email already exists."
        })
    }

}

exports.signIn = async (req, res) => {
    if (!req.body.email || !req.body.password) {
        return res.status(400).send({
            message: 'Email and Password Required'
        })
    }
    const invalidMsg = {
        message: "Invalid Email and Password Combination."
    }
    try {
        const user = await User.findOne({
            where: {
                email: req.body.email
            },
            attributes: ['id', 'email', 'password']
        })
        // cannot find user condition
        if (!user) return res.status(404).send({
            message: `There is no account with ${req.body.email}`
        })

        //check password valid or not
        const match = await validatePassword(req.body.password, user.password)
        //password match or not condition
        if (!match) return res.status(401).send(invalidMsg)
        //end check

        const token = createAccessToken(user)
        return res.send({
            message: 'Login Successful.',
            access_token: token
        })
    } catch (e) {
        return res.status(500).send('Internal Server Error')
    }

}

exports.profile = async (req, res) => {
    const subscription = await getSubscription(req.user.id)
    const categorySubscriptions = subscription.CategorySubscriptions

    let subscribed_categories = categorySubscriptions.map(async cs => {
        let category = await Category.findOne({
            where: {
                id: cs.category_id
            }
        })
        return {
            category_id: category.id,
            category_title: category.title,
            category_subtitle: category.subtitle,
            image: category.image,
            start_date: cs.start_date,
            end_date: cs.end_date
        }
    })
    Promise.all(subscribed_categories).then(categories => {
        const data = {
            name: req.user.name,
            email: req.user.email,
            active: subscription.active,
            subscribed_categories: categories
        }
        return res.send({
            data: data
        })
    })
}

exports.userInfo = (req, res) => {

    const kbzMerchCode = '200170';
    const kbzAppId = 'kp9539d5120b864436980c3f25966215';
    const kbzKey = 'zKyBnbqZYQ0P^H^4SSaBu3Bw&hsJAYlZ';
    const access_token = req.body.access_token;

    const nonce_str = randomString()

    const data = 'timestamp=1535166225&method=kbz.payment.queryCustInfo&nonce_str=' + nonce_str + '&version=1.0&appid=' + kbzAppId + '&merch_code=' + kbzMerchCode + '&trade_type=APPH5&access_token=' + access_token + '&resource_type=OPENID&key=' + kbzKey;

    console.log(data)

    var crypto = require('crypto');
    var sign_userInfo = crypto.createHash('sha256').update(data).digest('hex');

    const axios = require('axios');

    const postData = {
        Request: {
            method: 'kbz.payment.queryCustInfo',
            timestamp: '1535166225',
            nonce_str: nonce_str,
            sign_type: 'SHA256',
            sign: sign_userInfo,
            version: '1.0',
            biz_content: {
                merch_code: kbzMerchCode,
                appid: kbzAppId,
                trade_type: 'APPH5',
                access_token: access_token,
                resource_type: 'OPENID'
            }
        }
    }

    axios({
        url: 'http://api.kbzpay.com/web/gateway/uat/queryCustInfo',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'postman-token': '5a9daab7-0f06-d607-bfbb-7dd422b9bf1d'
        },
        data: postData
    }).then(response => {

        res.send({
            response: response.data.Response,
            openID: response.data.Response.customer_info.openID,
        })

    }).catch(error => {
        res.status(400).send({
            response: error.response.data.Response,
        })
    })

}