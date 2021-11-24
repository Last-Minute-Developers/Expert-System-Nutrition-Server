const dbMakanan = require('../models/makanan.model').Makanan
const dbObesitas = require('../models/obesitas.model')
const helper = require('../helpers/helper')

exports.getMakanan = async (req, res) => {
    const _id = req.params.id;

    let result

    try{
        if(_id === undefined){
            result = await dbMakanan.find()
        }
        else{
            result = await dbMakanan.findById(_id)
        }
        return res.status(200).send(result)
    } catch(err) {
        return res.status(500).send({message: err.message})
    }
}

exports.addMakanan = async (req, res) => {
    const{
        Nama_Makanan,
        Nilai_Lemak,
        Nilai_Karbo,
        Nilai_Protein,
        Nilai_Takaran,
        Nilai_Kalori
    } = req.body

    try{
        const fixName = helper.toTitleCase(Nama_Makanan)

        const makanan = await dbMakanan.find().where({Nama_Makanan: fixName})

        if(makanan.length > 0){
            return res.status(400).send({message: 'Maaf nama makanan sudah tersedia'})
        }

        const addMakanan = new dbMakanan({
            Nama_Makanan: fixName,
            Nilai_Lemak: parseInt(Nilai_Lemak),
            Nilai_Karbo: parseInt(Nilai_Karbo),
            Nilai_Protein: parseInt(Nilai_Protein),
            Nilai_Takaran: parseInt(Nilai_Takaran),
            Nilai_Kalori: parseInt(Nilai_Kalori)
        })

        await addMakanan.save()
        
        return res.status(200).send({message: 'Data makanan telah ditambahkan'})

    } catch(err) {
        return res.status(500).send({message: err.message})
    }
}

exports.patchMakanan = async (req, res) => {
    const _id = req.params.id
    
    const{
        Nama_Makanan,
        Nilai_Lemak,
        Nilai_Karbo,
        Nilai_Protein,
        Nilai_Takaran,
        Nilai_Kalori
    } = req.body

    try{
        const fixName = helper.toTitleCase(Nama_Makanan)

        const makanan = await dbMakanan.find().where({Nama_Makanan: fixName})

        if(makanan.length > 0){
            if(makanan[0]['Nama_Makanan'] === fixName)
                return res.status(400).send({message: 'Maaf nama makanan sudah tersedia'})
        }

        await dbMakanan.updateOne({_id}, {
            Nama_Makanan: fixName,
            Nilai_Lemak: parseInt(Nilai_Lemak),
            Nilai_Karbo: parseInt(Nilai_Karbo),
            Nilai_Protein: parseInt(Nilai_Protein),
            Nilai_Takaran: parseInt(Nilai_Takaran),
            Nilai_Kalori: parseInt(Nilai_Kalori)
        })
        
        return res.status(200).send({message: 'Data makanan berhasil diubah'})

    } catch(err) {
        return res.status(500).send({message: err.message})
    }
}

exports.deleteMakanan = async (req, res) => {
    const _id = req.params.id

    try{

        const obesitas = await dbObesitas.find().where({"Makanan._id": _id})

        if(obesitas.length !== 0){
            await dbObesitas.deleteOne({"Makanan._id": _id})
        }

        await dbMakanan.deleteOne({_id})

        return res.status(200).send({message: 'Data makanan berhasil dihapus'})
    }
    catch(err) {
        return res.status(500).send({message: err.message})
    }
}




