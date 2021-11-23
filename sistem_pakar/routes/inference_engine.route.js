const inferenceEngine = require('../controllers/inference_engine.controller')

module.exports = function (app) {
    app.post(
        '/api/inference/checking',
        inferenceEngine.diagnosa
    )
}