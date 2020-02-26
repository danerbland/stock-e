const Sequelize = require('sequelize')
const db = require('../db')

//Order Model

const Order = db.define('order', {

  type: {

    //TODO add short selling functionality
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isIn: [['buy', 'sell']]
    },
    defaultValue: 'buy'
  },

  //Price is calculated in pennies ($.01)
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },

  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  }

})


//TODO add hook to check price * quantity against user balance for buys and update the User cash accordingly.

//TODO add hook to update user cash on sale.



module.exports = Order
