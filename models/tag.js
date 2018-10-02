module.exports = function(sequelize, DataTypes) {
    var Tag = sequelize.define("Tag", {  
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
    });
  
    // **define relationships here**
    Tag.associate = function (models) {
      Tag.belongsToMany(models.Game, {
        through: models.GameTag
      })
    };
  
    return Tag;
  };