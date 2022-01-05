const express = require('express')
const app = express()
const port = process.env.PORT || 8080
const hbs=require('hbs')
app.use(express.json())
app.use(express.urlencoded())
const session=require('express-session')
app.set('view engine', 'hbs')
hbs.registerPartials(__dirname + '/../views/partials', function (err) {
  if (err) console.log(err)
})
const mongoose = require('mongoose')
require('dotenv').config()
const webSocket= require('./services/WebSocketService')
webSocket.inicializar()
const initializeAuthentication=require('./auth/initializeAuthentication')
const productRoutes = require('./routes/productoRoutes')
const userRoutes = require('./routes/userRoutes')
const carritoRoutes =require('./routes/carritoRoutes')
const frontendRoutes=require('./routes/frontendRoutes')
const mensajeRoutes=require('./routes/messageRoutes')
const authRoutes=require('./routes/authRoutes')

main()
  .then(() => console.log('Base de datos conectada'))
  .catch((err) => console.log(err))

async function main() {
  await mongoose.connect(process.env.DB_MONGO)
}
app.use(
    session({
      secret: 'secreto',
      saveUninitialized: true,
      cookie: {
        maxAge: process.env.SESSION_DURATION,
      },
    })
  )
  initializeAuthentication(app)
app.use('/api', productRoutes)
app.use('/api', carritoRoutes)
app.use('/', frontendRoutes)
app.use('/', authRoutes)
app.use('/api', mensajeRoutes)

app.listen(port, () => {
  console.log('App listening on port ', port)
})
