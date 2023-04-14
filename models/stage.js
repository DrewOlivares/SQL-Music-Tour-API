'use strict';
const {
  Model
} = require('sequelize');
const stage_event = require('./stage_event');
module.exports = (sequelize, DataTypes) => {
  class Stage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Event, Stage_event, Set_time }) {
      // define association here
      Stage.belongsToMany(Event, {
        foreignKey: 'stage_id',
        as: 'events',
        through: Stage_event
      })
      Stage.hasMany(Set_time, {
        foreignKey: 'stage_id',
        as: 'set_times'
      })
    }
  }
  Stage.init({
    stage_id: { 
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    stage_name: { 
      type: DataTypes.STRING,
      allowNull: false
  }
  }, {
    sequelize,
    modelName: 'Stage',
    tableName: 'stage',
    timestamps: false
  });
  return Stage;
};