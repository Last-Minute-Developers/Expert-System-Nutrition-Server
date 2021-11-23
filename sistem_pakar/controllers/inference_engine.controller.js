const dbMakanan = require('../models/makanan.model').Makanan
const dbObesitas = require('../models/obesitas.model')

exports.diagnosa = async (req, res) => {
    const {
        usia,
        jenis_kelamin,
        tinggi_badan,
        berat_badan,
        faktor_aktivitas,
        faktor_stress,
    } = req.body
        
    let IMT, BMR, Energi, Karbo, Protein, Lemak, Aktivitas, Stress

    let penyakit = ''

    let Diagnosa

    try{
        if(faktor_aktivitas === 'Ringan'){
            Aktivitas = 1.2
        }
        else if(faktor_aktivitas === 'Sedang'){
            Aktivitas = 1.3
        }
        else if(faktor_aktivitas === 'Berat'){
            Aktivitas = 1.4
        }

        if(faktor_stress === 'Ringan'){
            Stress = 1.2
        }
        else if(faktor_stress === 'Sedang'){
            Stress = 1.3
        }
        else if(faktor_stress === 'Berat'){
            Stress = 1.4
        }

        IMT = parseInt(berat_badan) / ((parseInt(tinggi_badan) / 100) * (parseInt(tinggi_badan) / 100))

        if(jenis_kelamin === 'Pria'){
            BMR = 66 + (13.7 * parseInt(berat_badan)) + (5 * parseInt(tinggi_badan)) - (6.8 * parseInt(usia))
        }
        else if(jenis_kelamin === 'Wanita'){
            BMR = 655 + (9.6 * parseInt(berat_badan)) + (1.8 * parseInt(tinggi_badan)) - (4.7 * parseInt(usia))
        }

        Energi = BMR * Aktivitas
        
        Karbo = ((60/100) * Energi) / 4
        Protein = ((15/100) * Energi) / 4
        Lemak = ((25/100) * Energi) / 9

        let makanan_larangan = []

        if(IMT >= 30){
            penyakit = 'obesitas'

            makanan_larangan = await dbObesitas.find()
        }

        const makanan = await dbMakanan.find()

        const listMakananLarangan = []

        const listMakanan = []

        if(makanan_larangan.length !== 0){
            for(let i = 0; i < makanan_larangan.length; i++)[
                listMakananLarangan.push(makanan_larangan[i]['Makanan']['Nama_Makanan'])
            ]
        }

        for(let i = 0; i < makanan.length; i++){
            if(!listMakananLarangan.includes(makanan[i]['Nama_Makanan'])){
                listMakanan.push(makanan[i])
            }
        }

        const makananTerpilih = []

        for(let i = 0; i < listMakanan.length; i++){
            if(
                ((Protein - listMakanan[i]['Nilai_Protein']) >= 0) &&
                ((Lemak - listMakanan[i]['Nilai_Lemak']) >= 0) &&
                ((Karbo - listMakanan[i]['Nilai_Karbo']) >= 0)
            ) {
                Protein -= listMakanan[i]['Nilai_Protein']
                console.log(Protein)
                Lemak -= listMakanan[i]['Nilai_Lemak']
                console.log(Lemak)
                Karbo -= listMakanan[i]['Nilai_Karbo']
                console.log(Karbo)
                console.log('')
                
                makananTerpilih.push(listMakanan[i])
            }
        }

        Diagnosa = {
            energi: Energi,
            karbo: Karbo,
            protein: Protein,
            lemak: Lemak,
            penyakit: penyakit,
            makananLarangan: makanan_larangan,
            makananTerpilih: makananTerpilih
        }

        return res.status(200).send(Diagnosa)

    } catch(err){
        return res.status(500).send({message: err.message})
    }
}

