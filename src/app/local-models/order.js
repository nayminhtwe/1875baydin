'use strict';
module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define('Order', {
        user_id: DataTypes.INTEGER,
        order_id: DataTypes.STRING,
        nonce_str: DataTypes.STRING,
        amount: DataTypes.BIGINT,
        payment_status: DataTypes.INTEGER,
        category_id: DataTypes.INTEGER,
        category_name: DataTypes.TEXT,
        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE
    }, { tableName: 'orders' });
    Order.associate = function (models) {
        Order.belongsTo(models.User, {
            foreignKey: 'user_id'
        })
    };
    return Order;
};


// const {
//     order
// } = require('sequelize');
//
// module.exports = (sequelize, DataTypes) => {
//     class order extends Model {
//         /**
//          * Helper method for defining associations.
//          * This method is not a part of Sequelize lifecycle.
//          * The `models/index` file will call this method automatically.
//          */
//         static associate(models) {
//             // define association here
//         }
//     };
//     order.init({
//         user_id: DataTypes.INTEGER,
//         order_id: DataTypes.STRING,
//         nonce_str: DataTypes.STRING,
//         amount: DataTypes.STRING,
//         createdAt: DataTypes.DATE,
//         updatedAt: DataTypes.DATE
//     }, {
//         sequelize,
//         modelName: 'order',
//     });
//
//     order.associate = function(models) {
//         order.belongsTo(models.User, {
//             foreignKey: 'user_id'
//         })
//     };
//     return order;
//
//
//
// };
