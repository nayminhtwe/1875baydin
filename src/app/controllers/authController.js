const User = require('../local-models').User
const Category = require('../remote-models').Category
const {
    getSubscription
} = require('../../utils/helper')
const {
    createAccessToken,
    validatePassword
} = require('../../utils/auth')

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