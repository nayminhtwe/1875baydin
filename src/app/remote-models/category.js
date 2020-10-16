'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    // title: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // image: {
    //   type: DataTypes.STRING,
    //   allowNull: true
    // },
    // parent_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // sort: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true
    // },
    // price: {
    //   type: DataTypes.BIGINT,
    //   allowNull: true
    // },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
  }, {
    tableName: 'pet'
  });
  Category.associate = function (models) {
    // associations can be defined here
  };
  return Category;
};