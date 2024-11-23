
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

// src/models/diagnostico-ia.js
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiagnosticoIA extends Model {
    static associate(models) {
      DiagnosticoIA.belongsTo(models.Paciente, {
        foreignKey: 'paciente_id',
        as: 'paciente'
      });

      DiagnosticoIA.belongsTo(models.Examen, {
        foreignKey: 'examen_id',
        as: 'examen'
      });

      DiagnosticoIA.belongsTo(models.ModeloIA, {
        foreignKey: 'modelo_id',
        as: 'modelo'
      });

      DiagnosticoIA.belongsTo(models.Usuario, {
        foreignKey: 'validado_por',
        as: 'validador'
      });
    }
  }

  DiagnosticoIA.init({
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    examen_id: DataTypes.INTEGER,
    modelo_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    imagen_url: {
      type: DataTypes.STRING,
      allowNull: false
    },
    resultado: {
      type: DataTypes.JSON,
      allowNull: false
    },
    anomalia_detectada: DataTypes.TEXT,
    gravedad: {
      type: DataTypes.ENUM('BAJA', 'MEDIA', 'ALTA', 'CRITICA'),
      allowNull: false
    },
    confianza: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        max: 1
      }
    },
    recomendaciones: DataTypes.TEXT,
    validado_por: DataTypes.INTEGER,
    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'VALIDADO', 'RECHAZADO'),
      defaultValue: 'PENDIENTE'
    },
    comentarios_medico: DataTypes.TEXT,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'DiagnosticoIA',
    tableName: 'diagnosticos_ia',
    underscored: true
  });

  return DiagnosticoIA;
};