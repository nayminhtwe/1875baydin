const Form = require('../local-models').Form
const {getSubscription} = require('../../utils/helper')

exports.create = async (req,res) => {
    const subscription = await getSubscription(req.user.id)
    //check user has ever subscribed or not 
    if (!subscription) return res.status(400).send({
        message: `${req.user.name} has never been subscribed any services.`
    })
    const {data} = req.body;
    if(!data) return res.status(400).send({
        message: "Data field is required."
    })
    Form.create({
        subscription_id: subscription.id,
        data: data
    }).then(data => {
        return res.status(201).send({message: "Form data saved Successfully."})
    }).catch(err => {
        return res.status(500).send({message: err.message || "Something went wrong."})
    })
}