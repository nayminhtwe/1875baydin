'use strict';
module.exports = (sequelize, DataTypes) => {
  const Content = sequelize.define('Content', {
    category_id: DataTypes.INTEGER,
    content: DataTypes.STRING,
    image: DataTypes.STRING,
    for_date: DataTypes.DATE,
    
  }, {
    tableName: 'contents',
    timestamps: true,
    underscored: true
  });
  Content.associate = function(models) {
    Content.belongsTo(models.Category, {
      foreignKey: 'category_id'
    })
  };
  return Content;
};