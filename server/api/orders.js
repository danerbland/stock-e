const router = require('express').Router()
const axios = require('axois')

const {Order} = require('../db/models')
require('../../secrets')

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
      throw 'User is not logged in'
    }
  } catch (err) {
    next(err)
  }
})

//Post new orders.  To protect this from price manipulation, we'll confirm the stock price here rather than getting it from req.body
router.post('/', async(req, res, next) => {
  try {
    if(req.user){
      const userId = req.user.id
      const {type, quantity, companyId, ticker} = req.body

      //confirm the price here from the API
      const requestURL = process.env.IEX_API_ENDPOINT + ticker + '/quote?token=' + process.env.IEX_API_KEY

      const {data} = await axios.get(requestURL)

      console.log('data from IEX: ', data)
      //TODO insert new order into db
      res.json(orders)
    } else {
      throw 'User is not logged in'
    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
