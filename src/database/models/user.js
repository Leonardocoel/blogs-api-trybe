"use strict";

/**
 * @param {import('sequelize').Sequelize } sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: DataTypes.INTEGER,
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );
  return User;
};

module.exports = User;
