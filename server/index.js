const db = require('./db')
const path = require('path')
const morgan = require('morgan')
const express = require('express')
const session = require('express-session')
const SequelizeStore = require('connect-session-sequelize')(session.Store)
const sessionStore = new SequelizeStore({db})
const passport = require('passport')
const PORT = process.env.PORT || 8080
const app = express()

function createApp (){
  // logging middleware
  app.use(morgan('dev'))

  // body parsing middleware
  app.use(express.json())
  app.use(express.urlencoded({extended: true}))

  // passport registration
passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.models.user.findByPk(id)
    done(null, user)
  } catch (err) {
    done(err)
  }
})

      // session middleware with passport
  app.use(
    session({
      secret: process.env.SESSION_SECRET || 'my best friend is Cody',
      store: sessionStore,
      resave: false,
      saveUninitialized: false
    })
  )
  app.use(passport.initialize())
  app.use(passport.session())

    //api route
    app.use('/api', require('./api'))

    //auth route
    app.use('/auth', require('./auth'))

    // static file-serving middleware
    app.use(express.static(path.join(__dirname, '..', 'public')))

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

const syncDb = () => db.sync()

async function bootApp () {
  await sessionStore.sync()
  await syncDb()
  await createApp()
  await startListening()
}

bootApp();

module.exports = app
