'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    user_id: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {
    tableName: 'subscriptions'
  });
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Subscription.hasMany(models.CategorySubscription, {
      foreignKey: 'subscription_id'
    })
  };
  return Subscription;
};