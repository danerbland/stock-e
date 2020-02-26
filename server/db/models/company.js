const Sequelize = require('sequelize')
const db = require('../db')

//Company model. NO PRICING INFO HERE. Pricing info will come live from API. This is for modularity/reusability and Lookahead company search.

const Company = db.define('company', {
  ticker: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      len: [1,5]
    }
  },

  name: {
    type: Sequelize.STRING,
    allowNull: false,
  }
})

//TODO add hook to handle special chars (example ORLY)

module.exports = Company
