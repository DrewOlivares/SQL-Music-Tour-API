'use strict';
const {
  Model
} = require('sequelize');
const stage_event = require('./stage_event');
module.exports = (sequelize, DataTypes) => {
  class Set_time extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Band, Event, Stage}) {
      // define association here
      Set_time.belongsTo(Band, {
        foreignKey: 'band_id',
        as: 'band'
      })
      Set_time.belongsTo(Event, {
        foreignKey: 'event_id',
        as: 'event'
      })
      Set_time.belongsTo(Stage, {
        foreignKey: 'stage_id',
        as: 'stage'
      })
    }
  }
  Set_time.init({
    set_time_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    band_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    },
    start_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    end_time: {
      type: DataTypes.DATE,
      allowNull: false
    },
    event_id: { 
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Set_time',
    tableName: 'set_time',
    timestamps: false
  });
  return Set_time;
};