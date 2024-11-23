
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Examen extends Model {
    static associate(models) {
      // Relación con Paciente
      Examen.belongsTo(models.Paciente, {
        foreignKey: 'paciente_id',
        as: 'paciente'
      });

      // Relación con Médico
      Examen.belongsTo(models.Medico, {
        foreignKey: 'medico_id',
        as: 'medico'
      });

      // Relación con Consulta
      Examen.belongsTo(models.Consulta, {
        foreignKey: 'consulta_id',
        as: 'consulta'
      });
    }
  }

  Examen.init({
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Se requiere ID del paciente' }
      }
    },
    medico_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Se requiere ID del médico' }
      }
    },
    consulta_id: DataTypes.INTEGER,
    tipo_examen: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El tipo de examen es requerido' }
      }
    },
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'EN_PROCESO', 'COMPLETADO', 'CANCELADO'),
      defaultValue: 'PENDIENTE'
    },
    resultados: DataTypes.TEXT,
    diagnostico_asociado: DataTypes.TEXT,
    notas_medicas: DataTypes.TEXT,
    archivo_url: DataTypes.STRING,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Examen',
    tableName: 'examenes',
    underscored: true
  });

  return Examen;
};