module.exports = function(app) {
 
    const auth = require('../controller/auth.controller.js');
 
    // ログイン処理
    app.post('/api/login', auth.login);
}