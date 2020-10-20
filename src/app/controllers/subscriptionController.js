const Subscription = require('../local-models').Subscription

exports.subscribe = (req, res) => {
    const user_id = req.user.id
    //TODO: update this function 
    Subscription.create({
        user_id: user_id
    })
}

exports.activeCategories = (req, res) => {

}