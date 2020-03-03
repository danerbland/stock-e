const Sequelize = require('sequelize')
const db = require('../db')
const User = require('./user')
const Portfolio = require('./portfolio')
const PortfolioCompany = require('./portfolioCompany')

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



//BeforeCreate hook to validate stock price, user cash balance, and portfolio status.
Order.beforeCreate(async (order) => {

  try {
    const user = await User.findByPk(order.userId)
    console.log('beforeCreate. user: ', user)
    if(!user){
      throw new Error('Invalid user Id!')
    }

    //buy here
    if(order.type==='buy'){
      //throw an error if the user lacks sufficient cash
      if(user.cash < (order.quantity * order.price)){
        throw new Error('Not Enough cash!')
      } else {
        //update the user's cash
        const cash = user.cash - (order.quantity * order.price)
        await user.update({cash})

        //update the user's portfolio to show the purchase.
        const portfolio = await Portfolio.findOne({where: {userId : user.id}})
        const portfolioCompany = await PortfolioCompany.findOrCreate({where: {
          portfolioId : portfolio.id,
          companyId: order.companyId
        }})
        const quantity = portfolioCompany[0].quantity + parseInt(order.quantity)
        //calculate the new average price here.
        const averagePrice = Math.ceil(((portfolioCompany[0].quantity * portfolioCompany[0].averagePrice) + (order.quantity * order.price)) / quantity)
        await portfolioCompany[0].update({quantity, averagePrice})
      }
    }
    //sell here
    else {
      console.log('in sell')
      const portfolio = await Portfolio.findOne({where: {userId : user.id}})
      const portfolioCompany = await PortfolioCompany.findOne({where: {
        portfolioId: portfolio.id,
        companyId: order.companyId
      }})

      //if the user doesn't own that company, throw an error
      if(!portfolioCompany){
        throw new Error('You don\'t own this company')
      }
      //if they are trying to sell more than they have, throw an error
      if(portfolioCompany.quantity < order.quantity){
        console.log('throwing new error!')
        throw new Error('You don\'t own enough of this company!')
      }
      //otherwise, add the sale to the user's cash and update the portfolio
      else {
        const cash = user.cash + (order.quantity * order.price)
        await user.update({cash})
        const quantity = portfolioCompany.quantity - order.quantity
        if(quantity === 0){
          await portfolioCompany.destroy()
        } else {
          await portfolioCompany.update({quantity})
        }
      }
    }
  } catch (error) {
    return Promise.reject(error)
  }
})



module.exports = Order
