module.exports = function(sequelize, DataTypes) {
    var GameTag = sequelize.define("GameTag", {  
      tag: {
        type: DataTypes.STRING,
        // allowNull: false,
      }
    });
    
    return GameTag;
  };