
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Paciente extends Model {
    static associate(models) {
      // Relación con Usuario
      Paciente.belongsTo(models.Usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });

      // Relación con Consultas (se implementará después)
      /*
      Paciente.hasMany(models.Consulta, {
        foreignKey: 'paciente_id',
        as: 'consultas'
      });
      */
    }
  }

  Paciente.init({
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    edad: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 150
      }
    },
    sexo: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: false
    },
    direccion: DataTypes.STRING,
    telefono: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    alergias: DataTypes.TEXT,
    condiciones_cronicas: DataTypes.TEXT,
    cirugias_pasadas: DataTypes.TEXT,
    usuario_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'usuarios',
        key: 'id'
      }
    },
    activo: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  }, {
    sequelize,
    modelName: 'Paciente',
    tableName: 'pacientes',
    underscored: true
  });

  return Paciente;
};