const db = require('./db')
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const PORT = process.env.PORT || 8080
const app = express()

function createApp (){
  // logging middleware
  app.use(morgan('dev'))



    //api route
    app.use('/api', require('./api'))


    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  //tell our server to send index.html
  app.use('*', (req, res, next) => {
    res.sendFile(path.join(__dirname, '..', 'public/index.html'))
  })

  // error handling endware
  app.use((err, req, res, next) => {
    console.error(err)
    console.error(err.stack)
    res.status(err.status || 500).send(err.message || 'Internal server error.')
  })

}



function startListening () {
  const server = app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
  })
}

async function bootApp () {
  await db.sync()
  await createApp()
  await startListening()
}

bootApp();

module.exports = app
