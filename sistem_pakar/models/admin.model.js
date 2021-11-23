const mongoose = require('mongoose')

const AdminSchema = mongoose.Schema({
    Nama_Admin: {
        type: String,
        required: true
    },
    Password_Admin: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model("admin", AdminSchema)
module.exports = Admin