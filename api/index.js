const express = require('express')
const md5 = require('md5')
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const app = express()
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: md5("cherryvoiceincyrux"),
  saveUninitialized:true,
  cookie: { maxAge: oneDay },
  resave: false
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const login = require('./login')
const homebanners = require('./home/banners')
const testimonials = require('./home/testimonials')
const partners = require('./home/partners')
const newsletters = require('./general/newsletters')
const inquiry = require('./general/inquiry')
const config = require('./general/config')

app.use(login)
app.use('/home/banner',homebanners)
app.use(testimonials)
app.use(partners)
app.use(newsletters)
app.use(inquiry)
app.use(config)

if (require.main === module) {
  const port = 3001
  app.listen(port, () => {
    console.log(`API server listening on port ${port}`)
  })
}

module.exports = app