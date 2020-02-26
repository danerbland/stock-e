const fs = require('fs')
const csv = require('csv-parse')
const path = require('path')
const Sequelize = require('sequelize')

const filePath = path.join(__dirname, '/companylist.csv');
const {Company} = require('../server/db/models')
const db = require('../server/db')


const seedDb = async () => {

  await db.sync({
    force: true,
  })
  console.log('db cleared')

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
}

seedDb()
