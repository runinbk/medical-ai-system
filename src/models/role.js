'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate(models) {
      Role.belongsToMany(models.Usuario, {
        through: 'usuario_roles',
        as: 'usuarios',
        foreignKey: 'role_id'
      });
    }
  }
  
  Role.init({
    nombre: DataTypes.STRING,
    descripcion: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Role',
    tableName: 'roles',
    underscored: true
  });
  
  return Role;
};