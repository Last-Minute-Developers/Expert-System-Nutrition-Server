const obesitasController = require('../controllers/obesitas.controller')

module.exports = function(app){
    app.get('/api/obesitas', obesitasController.getObesitas)

    app.post('/api/obesitas', obesitasController.addObesitas)

    app.delete('/api/obesitas/:id', obesitasController.deleteObesitas)
}