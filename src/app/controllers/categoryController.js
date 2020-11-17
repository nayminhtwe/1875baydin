const Category = require('../remote-models').Category
const { getPaginateInfo, getPaginatedData } = require('../../utils/paginate');

exports.all = (req, res) => {
    const {page, size} = req.query;
    const {limit, offset} = getPaginateInfo(page, size)

    Category.findAndCountAll({
        where: {
            parent_id: null
        },
        include: [{model: Category, as: "sub_categories"}],
        limit,offset
    }).then(data => {
        const responseData = getPaginatedData(data, page, limit)
        res.send(responseData)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured retriving categories."
        })
    })
}

exports.findOne = (req, res) => {
    const {id} = req.params;
    if(!id) return res.status(400).send({message: "Category ID required!"})

    Category.findOne({
        where: {
            id: id
        },
        include: [{
            model: Category,
            as: "sub_categories",
            include: [{
                model: Category,
                as: "sub_categories"
            }]
        }]
    }).then(result => {
        res.send(result)
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some errors occured retriving category."
        })
    })
}