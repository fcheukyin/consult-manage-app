module.exports = function(app) {
 
    const reviewers = require('../controller/reviewer.controller.js');
    const auth = require('../controller/auth.controller.js');
    
    app.get('/api/reviewers/search/:reviewerId', auth.checkIfAuthenicated, reviewers.findById);

    app.post('/api/admin/reviewers/import', reviewers.create);

    app.get('/api/admin/reviewers', auth.checkIfAuthenicated, reviewers.findAll)

    app.post('/api/reviewers/update', auth.checkIfAuthenicated, reviewers.update)

    app.post('/api/admin/reviewers/delete', auth.checkIfAuthenicated, reviewers.delete)
}