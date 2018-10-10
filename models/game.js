module.exports = function(sequelize, DataTypes) {
    var Game = sequelize.define("Game", {

      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.TEXT,
      },
      // filepath: {
      //   type: DataTypes.STRING,
      // },
      // thumbnail: {
      //   type: DataTypes.STRING,
      //   defaultValue: "https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png",
        
      // },
      rating: {
        type: DataTypes.INTEGER,
        defaultValue: 10,
      }
    });

  
    Game.associate = function(models) {
      Game.hasMany(models.Post, {
        onDelete: "CASCADE"
      })
      Game.hasMany(models.Vote, {
        onDelete: "CASCADE"
      })
      Game.belongsTo(models.User, {
      })
      Game.belongsToMany(models.Tag, {
        // through: models.GameTag
        through: "GameTags"
      })
    //   Game.belongsToMany(model.User, {
    //     through: models.UserGame  
    //   })
    };
  
    return Game;
  };