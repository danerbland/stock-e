const User = require('./user')
const Order = require('./order')
const Company = require('./company')
const Portfolio = require('./portfolio')
const PortfolioCompany = require('./portfolioCompany')

//Table associations.

User.hasMany(Order)
Order.belongsTo(User)

Company.hasMany(Order)
Order.belongsTo(Company)


//User can have many portfolios. E.G. retirement acct. trading acct. Trust.
User.hasMany(Portfolio)
Portfolio.belongsTo(User)

Portfolio.belongsToMany(Company, {through: PortfolioCompany})
Company.belongsToMany(Portfolio, {through: PortfolioCompany})

module.exports = {
  User,
  Company,
  Order,
  Portfolio,
  PortfolioCompany
}
