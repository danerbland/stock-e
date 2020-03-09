const router = require('express').Router()
const Op = require('sequelize').Op
const axios = require('axios')

const {Company} = require('../db/models')

//return all companies' ticker and name
router.get('/', async (req, res, next) => {
  try {
    const companies = await Company.findAll({
      attributes: ['ticker', 'name']
    })
    res.json(companies)

  } catch (error) {
    next(error)
  }
})

//for use in search bar lookahead
router.get('/ticker/:ticker', async (req, res, next) => {
  try {
    let companies = await Company.findAll({
      limit: 5,
      where: {
        ticker: {
          [Op.iLike]: req.params.ticker + '%'
        }
      }
    })
    res.json(companies)
  } catch (error) {
    next(error)
  }
})

//keep our API key secret by requesting single companies from our back end.  We will not store them in our db, but will get them on the back end and serve them to our front end.
router.get('/singleCompany/:ticker', async(req, res, next)=>{
  try {
    const requestURL = process.env.IEX_API_ENDPOINT + req.params.ticker + '/quote?token=' + process.env.IEX_API_KEY
    const {data} = await axios.get(requestURL)
    res.json(data)
  } catch (error) {
    next(error)
  }
})

module.exports = router
