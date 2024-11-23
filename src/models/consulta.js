
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Consulta extends Model {
    static associate(models) {
      // Relación con Paciente
      Consulta.belongsTo(models.Paciente, {
        foreignKey: 'paciente_id',
        as: 'paciente'
      });

      // Relación con Médico
      Consulta.belongsTo(models.Medico, {
        foreignKey: 'medico_id',
        as: 'medico'
      });

      // Relación con DiagnosticoIA (se implementará después)
      /*
      Consulta.belongsTo(models.DiagnosticoIA, {
        foreignKey: 'diagnostico_ia_id',
        as: 'diagnosticoIA'
      });
      */
    }
  }

  Consulta.init({
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
    fecha: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isFuture(value) {
          if (new Date(value) < new Date()) {
            throw new Error('La fecha debe ser futura');
          }
        }
      }
    },
    estado: {
      type: DataTypes.ENUM('PENDIENTE', 'CONFIRMADA', 'COMPLETADA', 'CANCELADA'),
      defaultValue: 'PENDIENTE'
    },
    sintomas: DataTypes.TEXT,
    diagnostico_preliminar: DataTypes.TEXT,
    tratamiento_prescrito: DataTypes.TEXT,
    seguimiento: DataTypes.TEXT,
    diagnostico_ia_id: DataTypes.INTEGER,
    notas: DataTypes.TEXT,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Consulta',
    tableName: 'consultas',
    underscored: true,
    hooks: {
      beforeCreate: async (consulta) => {
        // Validar disponibilidad del médico
        const consultaExistente = await sequelize.models.Consulta.findOne({
          where: {
            medico_id: consulta.medico_id,
            fecha: consulta.fecha,
            estado: ['PENDIENTE', 'CONFIRMADA']
          }
        });
        if (consultaExistente) {
          throw new Error('El médico no está disponible en ese horario');
        }
      }
    }
  });

  return Consulta;
};