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

app.engine('hbs', exphbs.engine({ extname: '.hbs', helpers: require('./helpers/handlebars_if_helper.js') }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))
app.use(expSession({ secret: 'secret', resave: true, saveUninitialized: true, cookie: { maxAge: 1800000 } }))

app.use(routes)

app.listen(port, () => {
  console.info(`app listening on port: ${port}!`)
})