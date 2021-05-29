'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Items.belongsTo(models.User, {
        foreignKey: 'listId',
        onDelete: 'CASCADE'
      })
      // define association here
    }
  };
  Items.init({
    item: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};