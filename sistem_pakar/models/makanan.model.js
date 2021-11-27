const mongoose = require('mongoose')

const MakananSchema = mongoose.Schema({
  Nama_Makanan: {
    type: String,
    required: true
  },
  Nilai_Lemak: {
    type: Number,
    required: true
  },
  Nilai_Karbo: {
    type: Number,
    required: true
  },
  Nilai_Protein: {
    type: Number,
    required: true
  },
  Nilai_Takaran: {
    type: Number,
    required: true
  },
  Nilai_Kalori: {
    type: Number,
    required: true
  }
})

const Makanan = mongoose.model("makanan", MakananSchema)
module.exports = {Makanan, MakananSchema}
