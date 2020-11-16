'use strict';
module.exports = (sequelize, DataTypes) => {
  const Form = sequelize.define('Form', {
    subscription_id: DataTypes.INTEGER,
    data: {
      type: DataTypes.TEXT,
      get: function () {
        return JSON.parse(this.getDataValue('data'));
      },
      set: function (value) {
        this.setDataValue('data', JSON.stringify(value));
      },
    }
  }, {});
  Form.associate = function (models) {
    // associations can be defined here
  };
  return Form;
};