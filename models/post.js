
module.exports = function(sequelize, DataTypes) {
  var Post = sequelize.define("Post", {  
    text: {
      type: DataTypes.STRING,
      allowNull: false
    },
    reported: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    approved: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  });

  // **define relationships here**
  Post.associate = function (models) {
    Post.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Post.belongsTo(models.Thread, {
      foreignKey: {
        allowNull: true
      }
    });
    Post.belongsTo(models.Game, {
      foreignKey: {
        allowNull: true
      }
    });
    Post.hasMany(models.Vote, {
      onDelete: "CASCADE"
    })
  };

  return Post;
};
