const express = require('express')
const db = require('./db')
const app = express()
const person = require('./models/person')

const bodyParser = require('body-parser');
const MenuItem = require('./models/menu');
app.use(bodyParser.json())

app.get('/', function (req, res) {
  res.send('Welcome To Our Hotel')
})


const personRoutes = require('./routes/personRoute')
app.use('/person',personRoutes)

const menuRoutes = require('./routes/menuRoute')
app.use('/menu',menuRoutes)


app.listen(3000,()=>{
    console.log('Server is running on port 3000')
  })

