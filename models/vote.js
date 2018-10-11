
module.exports = function(sequelize, DataTypes) {
  var Vote = sequelize.define("Vote", {  
    upDown: {
      type: DataTypes.BOOLEAN,
    },
  },{
    indexes:[
      {
        unique: true,
        fields: ['UserId','PostId']
      },
      {
        unique: true,
        fields: ['UserId', 'GameId']
      }
    ]
  }
  );

  // **define relationships here**
  Vote.associate = function (models) {
    Vote.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      }
    });
    Vote.belongsTo(models.Game, {
      foreignKey: {
        allowNull: true
      }
    });
    Vote.belongsTo(models.Post, {
      foreignKey: {
        allowNull: true,
      }
    });
  };

  return Vote;
};
