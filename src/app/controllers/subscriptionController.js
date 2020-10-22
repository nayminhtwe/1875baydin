const Subscription = require('../local-models').Subscription

exports.subscribe = (req, res) => {
    const user_id = req.user.id
    const category_id = req.body.category_id
    const subscription_period = req.body.subscription_period
    if(!category_id || !subscription_period) return res.status(400).send({message: 'Need Category ID or subscription period.'})
    Subscription.create({
        user_id: user_id
    }).then(sub => {
        sub.createCategorySubscription({
            category_id: category_id,
            subscription_period: subscription_period
        }).then(() => {
            res.send({message: 'success'})
        })
    })
}

exports.activeCategories = (req, res) => {

}