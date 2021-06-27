const Subscription = require('../local-models').Subscription
const Order = require('../local-models').Order
const { now, addDatesFromNow } = require('../../utils/dateTime')
const { RandomOrderString, randomString } = require('../../utils/helper')

exports.kbzCallback = (req, res) => {

    const trade_status = req.body.Request.trade_status;


    if (trade_status == 'PAY_SUCCESS') {
        Order.update(
            {
                payment_status: '0'
            },
            {
                where:
                {
                    order_id: req.body.Request.merch_order_id
                }
            }
        ).then(count => {
            const axios = require('axios');

            axios({
                url: 'https://chatbothoro.blueplanet.com.mm/api/v1/1875/horoscope/callback',
                method: 'POST',
                headers: {
                    'accept': 'application/json',
                    'cache-control': 'no-cache',
                    'content-type': 'application/json',
                    'postman-token': '5a9daab7-0f06-d607-bfbb-7dd422b9bf1d'
                },
                auth: {
                    username: 'admin2021@horo.com',
                    password: 'blue0cean@2021'
                },
                data: {
                    'status': "success",
                    'order_id': req.body.Request.merch_order_id
                }
            }).then(response => {
                res.send({

                    message: "success"

                })
            }).catch(error => {
                res.send({

                    message: error.data

                })
            })

        });
    } else {
        Order.update(
            {
                payment_status: '1'
            },
            {
                where:
                {
                    order_id: req.body.Request.merch_order_id
                }
            }
        ).then(count => {
            res.send({

                message: "fail"

            })
        });
    }
}