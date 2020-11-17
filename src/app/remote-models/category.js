'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define('Category', {
    title: {
      type: DataTypes.STRING,
      allowNull: true
    },
    subtitle: {
      type: DataTypes.STRING,
      allowNull: true
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true
    },
    parent_id: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    sort: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    price: {
      type: DataTypes.BIGINT,
      allowNull: true
    },
    sort: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    web_url: {
      type: DataTypes.STRING,
      allowNull: true
    },
    url_type: {
      type: DataTypes.STRING,
      allowNull: true
    },
    click_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    createAt: {
      field: 'created_at',
      type: DataTypes.DATE
    },
    updatedAt: {
      field: 'updated_at',
      type: DataTypes.DATE
    }
  }, {
    tableName: 'categories',
    timestamps: true,
    underscored: true
  });
  Category.associate = function (models) {
    // associations can be defined here
    Category.hasMany(models.Category, {
      foreignKey: 'parent_id',
      as: 'sub_categories'
    })
  };
  return Category;
};