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

exports.randomString = () => {

    var randomstring = require("randomstring");
    var id = randomstring.generate({
        charset: 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
        length: 32,
    });
    return id

}

exports.RandomOrderString = () => {

    var randomstring = require("randomstring");
    var id = randomstring.generate({
        charset: '1234567890',
        length: 19,
    });
    return id

}