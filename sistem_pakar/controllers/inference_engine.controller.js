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

    let penyakit = 'Tidak Ada'

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

        IMT = parseFloat(berat_badan) / ((parseFloat(tinggi_badan) / 100) * (parseFloat(tinggi_badan) / 100))

        if(jenis_kelamin === 'Pria'){
            BMR = 66 + (13.7 * parseFloat(berat_badan)) + (5 * parseFloat(tinggi_badan)) - (6.8 * parseFloat(usia))
        }
        else if(jenis_kelamin === 'Wanita'){
            BMR = 655 + (9.6 * parseFloat(berat_badan)) + (1.8 * parseFloat(tinggi_badan)) - (4.7 * parseFloat(usia))
        }

        if(IMT >= 30){
            Energi = BMR * Aktivitas * Stress
        }
        else{
            Energi = BMR * Aktivitas
        }
        
        Karbo = (((60/100) * parseFloat(Energi)) / 4) 
        Protein = (((15/100) * parseFloat(Energi)) / 4) 
        Lemak = (((25/100) * parseFloat(Energi)) / 9) 

        let fixKarbo = (((60/100) * parseFloat(Energi)) / 4) // + (( ((60/100) * Energi) / 4) * (10/100))
        let fixProtein = (((15/100) * parseFloat(Energi)) / 4) // + (( ((15/100) * Energi) / 4) * (10/100))
        let fixLemak = (((25/100) * parseFloat(Energi)) / 9) // + (( ((25/100) * Energi) / 9) * (10/100))

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

        console.log('PERHITUNGAN')
        console.log(fixLemak)
        console.log(fixKarbo)
        console.log(fixProtein)
        console.log('')

        const a = [];

        for(let i = 0; i < listMakanan.length; i++){
            if(
                ((fixLemak - listMakanan[i]['Nilai_Lemak']) >= 0) &&
                ((fixKarbo - listMakanan[i]['Nilai_Karbo']) >= 0) &&
                ((fixProtein - listMakanan[i]['Nilai_Protein']) >= 0)
            ) {
                console.log(listMakanan[i]['Nama_Makanan'])
                fixLemak -= listMakanan[i]['Nilai_Lemak']
                console.log(fixLemak)
                fixKarbo -= listMakanan[i]['Nilai_Karbo']
                console.log(fixKarbo)
                fixProtein -= listMakanan[i]['Nilai_Protein']
                console.log(fixProtein)
                console.log('')
                
                makananTerpilih.push(listMakanan[i]) 
            }
            else{
                console.log(listMakanan[i])
            }
        }

        Diagnosa = {
            energi: Energi.toFixed(2),
            karbo: Karbo.toFixed(2),
            protein: Protein.toFixed(2),
            lemak: Lemak.toFixed(2),
            penyakit: penyakit,
            makananLarangan: makanan_larangan,
            makananTerpilih: makananTerpilih
        }

        return res.status(200).send(Diagnosa)

    } catch(err){
        return res.status(500).send({message: err.message})
    }
}

