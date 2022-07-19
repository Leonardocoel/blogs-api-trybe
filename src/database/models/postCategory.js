"use strict";

/**
 * @param {import('sequelize').Sequelize } sequelize
 * @param {import('sequelize').DataTypes} DataTypes
 */

const PostCategory = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    "PostCategory",
    {
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        foreignKey: true,
      },
    },
    {
      timestamps: false,
    }
  );

  PostCategory.associate = ({ BlogPost, Category }) => {
    BlogPost.belongsToMany(Category, {
      through: "PostCategory",
      foreignKey: "postId",
      otherKey: "categoryId",
      as:'categories',
    });
    Category.belongsToMany(BlogPost, {
      through: "PostCategory",
      foreignKey: "categoryId",
      otherKey: "postId",
      as: 'posts',
    });
  };

  return PostCategory;
};

module.exports = PostCategory;
