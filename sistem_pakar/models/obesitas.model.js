const mongoose = require('mongoose')
const MakananSchema = require('../models/makanan.model').MakananSchema

const obesitasSchema = mongoose.Schema({
    Makanan: MakananSchema
})

const Obesitas = mongoose.model('obesitas', obesitasSchema)
module.exports = Obesitas

