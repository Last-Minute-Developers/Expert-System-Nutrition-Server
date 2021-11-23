const makananController = require('../controllers/makanan.controller')

module.exports = function(app) {
    app.get(
        '/api/makanan',
        makananController.getMakanan
    )

    app.get(
        '/api/makanan/:id',
        makananController.getMakanan
    )
    
    app.post(
        '/api/makanan', 
        makananController.addMakanan
    )

    app.put(
        '/api/makanan/:id',
        makananController.patchMakanan
    )

    app.delete(
        '/api/makanan/:id',
        makananController.deleteMakanan
    )
}



