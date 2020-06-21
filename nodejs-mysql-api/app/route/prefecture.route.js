module.exports = function(app) {
 
    const prefectures = require('../controller/prefecture.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    app.get('/api/prefectures', auth.checkIfAuthenicated, prefectures.findAll);
}