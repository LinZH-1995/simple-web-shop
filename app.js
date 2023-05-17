const express = require('express')
const exphbs = require('express-handlebars')
const expSession = require('express-session')
const methodOverride = require('method-override')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const routes = require('./routes')

const app = express()
const port = process.env.PORT || 3000

app.engine('hbs', exphbs.engine({ extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(expSession({ secret: 'secret', resave: false, saveUninitialized: false }))

app.use(routes)

app.listen(port, () => {
  console.info(`app listening on port: ${port}!`)
})