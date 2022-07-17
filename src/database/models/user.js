"use strict";

/**
 * @param {import('sequelize').Sequelize } sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const User = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
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
