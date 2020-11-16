const Subscription = require('../local-models').Subscription
const CategorySubscription = require('../local-models').CategorySubscription
const Content = require('../remote-models').Content
const { getPaginateInfo,getPaginatedData } = require('../../utils/paginate')
const { now,checkValidDate } = require('../../utils/dateTime')

exports.contents = async (req,res) => {
    const {page, size, category_id, content_category_id} = req.query
    //check category_id contains or not.
    if (!category_id || !content_category_id) return res.status(400).send({message: "Category ID and Content Category ID is required to get specific contents!"})

    const subscription = await Subscription.findOne({
        where: {
            user_id : req.user.id
        }
    })
    //check user has ever subscribed or not 
    if (!subscription) return res.status(400).send({message: `${req.user.name} has never been subscribed any services.`})
    const categorySubscription = await CategorySubscription.findAll({
        limit: 1,
        where: {
            subscription_id : subscription.id,
            category_id : category_id,
        },
        order: [
            ['createdAt', 'DESC']
        ]
    })
    //check user subscribed requested category or not
    if (categorySubscription.length == 0) return res.status(400).send({message: `${req.user.name} did not subscribe to requested category`})
    const date_range = {
        start_date : categorySubscription.start_date,
        end_date : categorySubscription.end_date
    }
    const subscription_is_valid = checkValidDate(date_range, now("YYYY-M-D"))
    //chceck subscription period is valid or not.
    if (!subscription_is_valid) return res.status(400).send({message: "Subscription period is over."})
    const {limit, offset} = getPaginateInfo(page, size)
    Content.findAndCountAll({
        where: {category_id : content_category_id},
        limit, offset,
        order: [
            ['createdAt', 'DESC']
        ]
    }).then(data => {
        const responsedData = getPaginatedData(data, page, limit)
        return res.send(responsedData)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured retriving contents."
        })
    })
}