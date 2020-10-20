'use strict';
module.exports = (sequelize, DataTypes) => {
  const categorySubscription = sequelize.define('categorySubscription', {
    category_id: DataTypes.INTEGER,
    subscription_id: DataTypes.INTEGER,
    subscription_period: DataTypes.STRING
  }, {
    tableName: 'category_subscriptions'
  });
  categorySubscription.associate = function(models) {
    categorySubscription.belongsTo(models.Subscription, {
      foreignKey: 'subscription_id'
    })
  };
  return categorySubscription;
};