
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class ModeloIA extends Model {
    static associate(models) {
      ModeloIA.hasMany(models.DiagnosticoIA, {
        foreignKey: 'modelo_id',
        as: 'diagnosticos'
      });
    }
  }

  ModeloIA.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false
    },
    version: {
      type: DataTypes.STRING,
      allowNull: false
    },
    descripcion: DataTypes.TEXT,
    tipo_analisis: {
      type: DataTypes.ENUM('RADIOGRAFIA', 'TOMOGRAFIA', 'RESONANCIA', 'OTRO'),
      allowNull: false
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'ModeloIA',
    tableName: 'modelos_ia',
    underscored: true
  });

  return ModeloIA;
};