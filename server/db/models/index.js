const User = require('./user')
const Order = require('./order')
const Company = require('./company')

//Table associations.

User.hasMany(Order)
// Order.hasOne(User)

Company.hasMany(Order)
// Order.hasOne(Company)

module.exports = {
  User,
  Company,
  Order
}
