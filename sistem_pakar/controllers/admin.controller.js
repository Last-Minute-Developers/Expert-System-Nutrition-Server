const dbAdmin = require('../models/admin.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signUp = async (req, res) =>{
    const{
        Nama_Admin,
        Password_Admin
    } = req.body

    try{
        
        if((await dbAdmin.find().where({Nama_Admin})).length !== 0){
            return res.status(200).send({message: 'maaf username telah terdaftar silahkan gunakan username yang baru'})
        }

        const fixPassword = await bcrypt.hash(Password_Admin, 8)

        const admin = new dbAdmin({
            Nama_Admin,
            Password_Admin: fixPassword
        })
    
        await admin.save()
    
        return res.status(200).send({message: 'Register Berhasil'})
    } catch(err){
        return res.status(500).send({message: err.message})
    }
}

exports.signIn = async (req, res) => {
    const{Nama_Admin, Password_Admin} = req.body

    try{
        const admin = await dbAdmin.find().where({Nama_Admin})

        if(admin.length <= 0){
            return res.status(400).send({message: 'Password atau username anda salah', login: false})
        }

        let isValid = await bcrypt.compare(Password_Admin, admin[0].Password_Admin)
        
        if(!isValid){
            return res.status(400).send({message: 'Password atau username anda salah', login: false})
        }

        const token = jwt.sign({Nama_Admin: admin[0].Nama_Admin}, process.env.AUTH_JWT_KEY, {
            expiresIn: 21600
        })
    
        return res.status(200).send({
            message: 'Login Berhasil',
            login: true,
            token
        })
    } catch(err) {
        return res.status(500).send({message: err.message})
    }
}