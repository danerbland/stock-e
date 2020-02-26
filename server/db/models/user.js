const Sequelize = require('sequelize')
const db = require('../db')
const crypto = require('crypto')

//User model.

const User = db.define('user', {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isAlpha: true,
    }
  },

  //optional bio
  bio: {
    type: Sequelize.TEXT,
    allowNull: false,
    defaultValue: 'No Bio Provided'
  },

  //email is the unique identifier for log-in
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    }
  },

  //Cash is calculated in pennies ($.01)
  cash: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 500000,
    validate: {
      min: 0,
    }
  },

  password: {
    type: Sequelize.STRING,
    // Making `.password` act like a func hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('password')
    }
  },

  salt: {
    type: Sequelize.STRING,
    // Making `.salt` act like a function hides it when serializing to JSON.
    // This is a hack to get around Sequelize's lack of a "private" option.
    get() {
      return () => this.getDataValue('salt')
    }
  },

})

//Instance Methods
User.prototype.correctPassword = function(pwd){
  return User.encryptPassword(pwd, this.salt()) === this.password()
}

//Class Methods
User.generateSalt = () => {
  return crypto.randomBytes(16).toString('base64')
}

User.encryptPassword = (pwd, salt) => {
  return crypto
  .createHash('RSA-SHA256')
  .update(pwd)
  .update(salt)
  .digest('hex')
}

const setSaltAndPassword = (user) => {
  if(user.changed('password')){
    user.salt = User.generateSalt()
    user.password = User.encryptPassword(user.password(), user.salt())
  }
}

//hooks
User.beforeCreate((user) => {
  setSaltAndPassword(user)
})

User.beforeUpdate((user) => {
  setSaltAndPassword(user)
})

User.beforeBulkCreate((users) => {
  users.forEach(user => setSaltAndPassword(user))
})

module.exports = User
