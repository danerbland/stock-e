const router = require('express').Router()
const Op = require('sequelize').Op

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
      limit: 10,
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

module.exports = router
