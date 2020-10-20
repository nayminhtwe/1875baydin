'use strict';
module.exports = (sequelize, DataTypes) => {
  const Subscription = sequelize.define('Subscription', {
    user_id: DataTypes.INTEGER,
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1
    }
  }, {});
  Subscription.associate = function (models) {
    Subscription.belongsTo(models.User, {
      foreignKey: 'user_id'
    })
    Subscription.hasMany(models.categorySubscription, {
      foreignKey: 'subscription_id'
    })
  };
  return Subscription;
};