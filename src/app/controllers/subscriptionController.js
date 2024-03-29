const Subscription = require('../local-models').Subscription
const Order = require('../local-models').Order
const { now, addDatesFromNow } = require('../../utils/dateTime')
const { RandomOrderString, randomString } = require('../../utils/helper')

exports.subscribe = async (req, res) => {
    const user_id = req.user.id
    const category_id = req.body.category_id
    const subscription_period = req.body.subscription_period
    const start_date = now()
    const end_date = addDatesFromNow(subscription_period, start_date)
    if (!category_id || !subscription_period) return res.status(400).send({
        message: 'Need Category ID and subscription period.'
    })
    const subscription = await Subscription.findOne({
        where: {
            user_id: user_id
        }
    })
    if (subscription) {
        //user has already subscribed any services.
        subscription.createCategorySubscription({
            category_id: category_id,
            start_date: start_date,
            end_date: end_date
        }).then(() => {
            res.send({
                message: 'success'
            })
        })
    } else {
        //user has never subscribed before
        Subscription.create({
            user_id: user_id
        }).then(sub => {
            sub.createCategorySubscription({
                category_id: category_id,
                start_date: start_date,
                end_date: end_date
            }).then(() => {
                res.send({
                    message: 'success'
                })
            })
        })
    }

}

exports.activeCategories = (req, res) => {

}

exports.preCreate = (req, res) => {

    console.log(req.body)

    const kbzMerchCode = '200125';
    const kbzAppId = 'kp0c795277cb7a46f48ef07d944243ea';
    const kbzKey = '6d74096f22adca0158f50a1e704ffd7e';
    const kbzNotifyUrl = 'https://1875pb.blueplanet.com.mm/api/kbz/callback';

    const order_id = RandomOrderString()
    const nonce_str = randomString()
    const amount = req.body.amount;

    const data = 'appid=' + kbzAppId + '&callback_info=urlencoede&merch_code=' + kbzMerchCode + '&merch_order_id=' + order_id + '&method=kbz.payment.precreate&nonce_str=' + nonce_str + '&notify_url=' + kbzNotifyUrl + '&timeout_express=100m&timestamp=1535166225&title=SawShinTest&total_amount=' + amount + '&trade_type=APPH5&trans_currency=MMK&version=1.0&key=' + kbzKey;

    var crypto = require('crypto');
    var sign_precreate = crypto.createHash('sha256').update(data).digest('hex');

    const axios = require('axios');

    axios({
        url: 'https://api.kbzpay.com/payment/gateway/precreate',
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'cache-control': 'no-cache',
            'content-type': 'application/json',
            'postman-token': '5a9daab7-0f06-d607-bfbb-7dd422b9bf1d'
        },
        data: {
            Request: {
                timestamp: '1535166225',
                method: 'kbz.payment.precreate',
                notify_url: kbzNotifyUrl,
                nonce_str: nonce_str,
                sign_type: 'SHA256',
                sign: sign_precreate,
                version: '1.0',
                biz_content: {
                    merch_order_id: order_id,
                    merch_code: kbzMerchCode,
                    appid: kbzAppId,
                    trade_type: 'APPH5',
                    title: 'SawShinTest',
                    total_amount: amount,
                    trans_currency: 'MMK',
                    timeout_express: '100m',
                    callback_info: 'urlencoede',
                }
            }
        }
    }).then(response => {

        const user_id = req.user.id;
        const category_id = req.body.category_id;
        const category_name = req.body.category_name;
        Order.create({
            user_id: user_id,
            order_id: order_id,
            nonce_str: nonce_str,
            payment_status: '1',
            amount: amount,
            category_id: category_id,
            category_name: category_name
        })

        const prepay_id = response.data.Response.prepay_id;

        const sdo = 'appid=' + kbzAppId + '&merch_code=' + kbzMerchCode + '&nonce_str=' + nonce_str + '&prepay_id=' + prepay_id + '&timestamp=1535166225&key=' + kbzKey;

        var sign_app = crypto.createHash('sha256').update(sdo).digest('hex');

        res.send({

            prepay_id: prepay_id,
            order_info: sdo,
            sign_app: sign_app,
            order_id: order_id,
            user_id: user_id

        })

    }).catch(error => {
        console.log(error)
    })

}

exports.orders = async (req, res) => {
    console.log(req.user.id)
    let orders = await Order.findAll({
        where: {
            payment_status: 0,
            user_id: req.user.id

        }
    });
    res.send({
        message: 'succes',
        orders: orders

    })
}