const Sequelize = require('sequelize')
const db = require('../db')

//PortfolioCompany - a join table between portfolio and company

const PortfolioCompany = db.define('portfolioCompany', {
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0
    },
    defaultValue: 0
  },
  //Average price in pennies
  averagePrice: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  }
})

module.exports = PortfolioCompany
