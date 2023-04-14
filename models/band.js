'use strict';
const {
  Model
} = require('sequelize');
const set_time = require('./set_time');
module.exports = (sequelize, DataTypes) => {
  class Band extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Meet_greet, Set_time }) {
      // define association here
      Band.hasMany(Meet_greet, {
        foreignKey: "band_id",
        as: "meet_greets"
      })
      Band.hasMany(Set_time, {
        foreignKey: "band_id",
        as: "set_times"
      })
    }
  }
  Band.init({
    band_id: { 
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: { 
        type: DataTypes.STRING,
        allowNull: false
    },
    genre: { 
        type: DataTypes.TEXT,
        allowNull: false
    },
    available_start_time: { 
        type: DataTypes.DATE,
        allowNull: false
    },
    end_time: { 
        type: DataTypes.DATE,
        allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Band',
    tableName: 'band',
    timestamps: false
  });
  return Band;
}