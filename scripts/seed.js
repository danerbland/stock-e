const fs = require('fs')
const csv = require('csv-parse')
const path = require('path')
const Sequelize = require('sequelize')

const filePath = path.join(__dirname, '/companylist.csv');
const {Company, User, Portfolio, Order} = require('../server/db/models')
const db = require('../server/db')


const seedDb = async () => {

  await db.sync({
    force: true,
  })
  console.log('db cleared')

  //Seed Companies

  const companyObjects = [];

  fs.createReadStream(filePath)
  .pipe(csv())
  .on('data', (data) => companyObjects.push({
    "ticker" : data[0],
    "name" : data[1],
  }))
  .on('end', async () => {

    //now we seed our db.
    await Company.bulkCreate(companyObjects.slice(1,))

  });


  //seed Users

  const users = [
    {
      'name': 'Dan',
      'bio': 'New soap enthusiast from New York! Trying to stay clean in a grimy city.',
      'email': 'danerbland@gmail.com',
      'password': '123',
    },
    {
      'name': 'Tayla',
      'bio': 'Connoisseur of the high life',
      'email': 'tayla@fullstack.com',
      'password': '123'
    },
    {
      'name': 'Alex',
      'bio': 'Very clean! Amateur soapmaker and soap enthusiast',
      'email': 'Alex@soaps.com',
      'password': '123'

    },
    {
      'name': 'Peter',
      'bio': 'I don\'t really know what I\'m doing here. I prefer mud',
      'email': 'peter@darpa.gov',
      'password': '123'
    }
  ]

  await User.bulkCreate(users)


}

seedDb()
