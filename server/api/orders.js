const router = require('express').Router()
const axios = require('axios')

const {Order, Company} = require('../db/models')

if (process.env.NODE_ENV === 'development') {
  require('../../secrets')}

router.get('/', async (req, res, next) => {
  try {
    if(req.user){
      const userId = req.user.id
      const orders = Order.findAll({
        where: {
          userId
        }
      })
      res.json(orders)
    } else {
      throw new Error('User is not logged in')
    }
  } catch (err) {
    console.log('error here!')
    next(err)
  }
})

//Post new orders.  To protect this from price manipulation, we'll confirm the stock price here rather than getting it from req.body
router.post('/', async(req, res, next) => {
  try {
    if(!req.user){
      throw new Error('User is not logged in!')
    }
    else {
      const userId = req.user.id
      const {type, quantity, companyId} = req.body

      //Get the company's ticker internally to avoid manipulation
      const {ticker} = await Company.findByPk(companyId)
      console.log("ticker: ", ticker)

      //confirm the price here from the API
      const requestURL = process.env.IEX_API_ENDPOINT + ticker + '/quote?token=' + process.env.IEX_API_KEY

      const {data} = await axios.get(requestURL)

      //round the price up to the nearest cent.
      if(!data.latestPrice){
        throw new Error(`No Pricing Information available for ${data.companyName}`)
      }
      const price = Math.ceil(parseFloat(data.latestPrice) * 100)

      //Create the order
      const order = await Order.create({
        type,
        price,
        quantity,
        userId,
        companyId,
      })
      res.json(order)
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
