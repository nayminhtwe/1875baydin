const Subscription = require('../app/local-models').Subscription
const CategorySubscription = require('../app/local-models').CategorySubscription

exports.getSubscription = user_id => {
    return Subscription.findOne({
        where: {user_id : user_id},
        include: {
            model: CategorySubscription,
        },
        order: [
            ['CategorySubscriptions', 'createdAt', 'desc']
        ]
    })
}