const Subscription = require('../local-models').Subscription
const { now, addDatesFromNow } = require('../../utils/dateTime')

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