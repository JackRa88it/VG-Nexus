
module.exports = function(sequelize, DataTypes) {
  var Thread = sequelize.define("Thread", {  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    pinned: {
      type: DataTypes.BOOLEAN,
    }
  });

  Thread.associate = function (models) {
    Thread.hasMany(models.Post, {
      onDelete: "CASCADE"
    }),
    Thread.belongsTo(models.Forum, {
    }),
    Thread.belongsTo(models.User, {
    })
  };

  return Thread;
};
