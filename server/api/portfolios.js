const router = require('express').Router()
const axios = require('axios')

const {PortfolioCompany, Portfolio, Company} = require('../db/models')

router.get('/', async (req, res, next) => {
  try {

    //If the user is logged in, get the portfolio and include the companies.
    if(req.user){
      const userId = req.user.id
      const portfolio = await Portfolio.findOne({
        where: {
          userId
        },
        include: [{
          model: Company,
          attributes: ['ticker'],
          }]
      })

      //TODO get the company's current price and add it to each object in the response.
      for(row of portfolio.companies){
        const requestURL = process.env.IEX_API_ENDPOINT + row.ticker + '/quote?token=' + process.env.IEX_API_KEY
        const {data} = await axios.get(requestURL)
        console.log('data: ', data)
        row.dataValues.currentPrice = Math.floor(parseFloat(data.latestPrice) * 100)
        row.dataValues.companyName = data.companyName
        row.dataValues.change = data.change
        row.dataValues.changePercent = data.changePercent
      }

      res.json(portfolio)

    }
  } catch (err) {
    next(err)
  }
})

module.exports = router
