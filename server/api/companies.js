const router = require('express').Router()
const Company = require('../db/models')

//return all companies' ticker and name
router.use('/', (req, res, next) => {
  try {
    const companies = await Company.findAll({
      attributes: ['ticker', 'name']
    })
    res.json(companies)

  } catch (error) {
    next(error)
  }
})

module.exports = router
