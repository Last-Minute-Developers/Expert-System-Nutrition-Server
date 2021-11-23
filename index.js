require('dotenv/config')
const express = require('express')
const cors = require('cors')
const app = express()

require('./config/mongo.config')()

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(cors())

app.get('/', (req, res) => {
    return res.status(200).send({message: 'Welcome to Expert System Nutrition API'})
})

require('./sistem_pakar/routes/makanan.route')(app)

const PORT = process.env.PORT || 8080
app.listen(PORT, () => {
  console.log(`Listening to the server ${PORT}`)
})
