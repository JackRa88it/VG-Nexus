
module.exports = function(sequelize, DataTypes) {
  var Forum = sequelize.define("Forum", {  
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    }
  });

  Forum.associate = function (models) {
    Forum.hasMany(models.Thread, {
      onDelete: "CASCADE"
    });
  };

  return Forum;
};
