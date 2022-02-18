// import the Model class and DataTypes object from Sequelize.
// This Model class is what we create our own models from using the extends keyword so User inherits all of the functionality the Model class has.
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// create our User model
class User extends Model {}

// define table columns and configuration
User.init(
    {
        // define an id column
        // If we didn't define the model to have a primaryKey option set up anywhere, Sequelize would create one for us, but it's best we explicitly define all of the data. 
      id: {
        // use the special Sequelize DataTypes object provide what type of data it is
        type: DataTypes.INTEGER,
        // this is the equivalent of SQL's `NOT NULL` option
        allowNull: false,
        // instruct that this is the Primary Key
        primaryKey: true,
        // turn on auto increment
        autoIncrement: true
      },
      // define a username column
      username: {
        type: DataTypes.STRING,
        allowNull: false
      },
      // define an email column
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        // there cannot be any duplicate email values in this table
        unique: true,
        // if allowNull is set to false, we can run our data through validators before creating the table data
        validate: {
          isEmail: true
        }
      },
      // define a password column
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          // this means the password must be at least four characters long
          len: [4]
        }
      }
    },
    {
        hooks: {
            // set up beforeCreate lifecycle "hook" functionality. for password creating at sign up
           async beforeCreate(newUserData) {  // execute the bcrypt hash function on the plaintext password.
              newUserData.password = await bcrypt.hash(newUserData.password, 10); //we pass in the userData object that contains the plaintext password in the password property. We also pass in a saltRound value of 10.
                return newUserData;  // new hashed password is passed to the promise object and the return statement exits the function
              },
                // set up beforeUpdate lifecycle "hook" functionality. For password changing
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
          },
      sequelize,
      timestamps: false,
      freezeTableName: true,
      underscored: true,
      modelName: 'user'
    }
  );

module.exports = User;