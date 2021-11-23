const adminController = require('../controllers/admin.controller')

module.exports = function(app){
    app.use(function (req, res, next) {
        res.header(
          'Access-Control-Allow-Headers',
          'x-access-token, Origin, Content-Type, Accept'
        )
        next()
    })
    
    app.post(
        '/api/admin/acc/signup',
        adminController.signUp
    )

    app.post(
        '/api/admin/acc/signin',
        adminController.signIn
    )
}

