'use strict';
module.exports = (sequelize, DataTypes) => {
  const CategorySubscription = sequelize.define('CategorySubscription', {
    category_id: DataTypes.INTEGER,
    subscription_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  CategorySubscription.associate = function(models) {
    CategorySubscription.belongsTo(models.Subscription, {
      foreignKey: 'subscription_id'
    })
  };
  return CategorySubscription;
};