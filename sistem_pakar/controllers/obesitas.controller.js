const dbObesitas = require('../models/obesitas.model')
const dbMakanan = require('../models/makanan.model').Makanan

exports.getObesitas = async (req, res) => {
    try{
        const obesitas = await dbObesitas.find()
        return res.status(200).send(obesitas)
    } catch(err){
        return res.status(500).send({message: err.message})
    }
}

exports.addObesitas = async (req, res) => {
    const{ID_Makanan} = req.body

    try{
        const makanan = await dbMakanan.findById(ID_Makanan)

        if(makanan === null)
            return res.status(400).send({message: 'Makanan tidak tersedia'})

        const obesitas = new dbObesitas({
            Makanan: makanan
        })
    
        await obesitas.save()
    
        return res.status(200).send({message: 'Daftar makanan yang dilarang berhasil ditambahkan'})
    } catch(err) {
        return res.status(500).send({message: err.message})
    }
}

exports.deleteObesitas = async (req, res) => {
    const _id = req.params.id

    try{
        await dbObesitas.deleteOne({_id})
        return res.status(200).send({message: "Daftar makanan telah dihapus"})
    } catch(err){
        return res.status(500).send({message: err.message})
    }
}


