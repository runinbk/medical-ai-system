
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    static associate(models) {
      // Relación con Paciente
      Documento.belongsTo(models.Paciente, {
        foreignKey: 'paciente_id',
        as: 'paciente'
      });

      // Relación con Consulta
      Documento.belongsTo(models.Consulta, {
        foreignKey: 'consulta_id',
        as: 'consulta'
      });

      // Relación con Examen
      Documento.belongsTo(models.Examen, {
        foreignKey: 'examen_id',
        as: 'examen'
      });

      // Relación con Usuario (creador)
      Documento.belongsTo(models.Usuario, {
        foreignKey: 'creado_por',
        as: 'creador'
      });

      // Relación con Usuario (modificador)
      Documento.belongsTo(models.Usuario, {
        foreignKey: 'modificado_por',
        as: 'modificador'
      });
    }
  }

  Documento.init({
    paciente_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notNull: { msg: 'Se requiere ID del paciente' }
      }
    },
    consulta_id: DataTypes.INTEGER,
    examen_id: DataTypes.INTEGER,
    tipo_documento: {
      type: DataTypes.ENUM(
        'HISTORIA_CLINICA',
        'RESULTADO_EXAMEN',
        'RECETA_MEDICA',
        'INFORME_MEDICO',
        'CONSENTIMIENTO',
        'OTRO'
      ),
      allowNull: false,
      validate: {
        notNull: { msg: 'El tipo de documento es requerido' }
      }
    },
    nombre_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'El nombre del archivo es requerido' }
      }
    },
    ubicacion_archivo: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'La ubicación del archivo es requerida' }
      }
    },
    fecha_documento: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    descripcion: DataTypes.TEXT,
    mime_type: DataTypes.STRING,
    tamanio: DataTypes.INTEGER,
    version: {
      type: DataTypes.INTEGER,
      defaultValue: 1
    },
    creado_por: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    modificado_por: DataTypes.INTEGER,
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Documento',
    tableName: 'documentos',
    underscored: true,
    hooks: {
      beforeUpdate: async (documento) => {
        if (documento.changed()) {
          documento.version += 1;
        }
      }
    }
  });

  return Documento;
};