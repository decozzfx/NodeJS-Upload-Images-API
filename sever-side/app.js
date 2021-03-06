const createError = require('http-errors')
const express = require('express')
const path = require('path')
const cookieParse = require('cookie-parser')
const logger = require('morgan')
const cors = require('cors')
const Router = require('./public/routes/index.js')

//middleware
const app = express()
app.use(cors({origin : 'http://localhost:5000'}))


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended : false}))
app.use(cookieParse())
app.use(express.static(path.join(__dirname, 'public')))

// router
app.use('/', Router)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404))
})

//error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status( err.message || 500)
  res.render('error')
})

module.exports = app