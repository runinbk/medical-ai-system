'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DiagnosticoIA extends Model {
    static associate(models) {
      DiagnosticoIA.belongsTo(models.Paciente, {
        foreignKey: 'id_paciente',
        as: 'paciente'
      });

      DiagnosticoIA.belongsTo(models.Usuario, {
        foreignKey: 'id_user',
        as: 'usuario'
      });
    }
  }

  DiagnosticoIA.init({
    id_paciente: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    id_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    diagnostico_ia: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    diagnostico_medico: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    imagen_original: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    imagen_marcada_ia: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'DiagnosticoIA',
    tableName: 'diagnosticos_ia',
    underscored: true
  });

  return DiagnosticoIA;
};