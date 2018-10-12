// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    // The password cannot be null
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING,
    },
    avatar: {
      type: DataTypes.STRING,
      defaultValue: "https://i2.wp.com/www.ahfirstaid.org/wp-content/uploads/2014/07/avatar-placeholder.png",
      // **look into storing images**
    },
    score: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: "user",
    },
    postBanner: {
      type: DataTypes.STRING,
    }
  });
  // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
  User.prototype.validPassword = function(password) {
    console.log('validating')
    return bcrypt.compareSync(password, this.password);
  };
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

   // **define relationships here**
  User.associate = function(models) {
    User.hasMany(models.Game, {
      onDelete: "CASCADE"
    });
    User.hasMany(models.Post, {
      onDelete: "CASCADE"
    });
    User.hasMany(models.Thread, {
      onDelete: "CASCADE"
    });
    User.hasMany(models.Vote, {
      onDelete: "CASCADE"
    });

    User.belongsToMany(models.User, {
      as: "Friends", through: "UserFriends"
    });
    User.belongsToMany(models.Game, {
      as: "Favorites", through: "UserGames"
    });
  };

  return User;
};
