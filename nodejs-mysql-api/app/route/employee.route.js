module.exports = function(app) {
 
    const employees = require('../controller/employee.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    // Create a new Customer
    app.post('/api/admin/employees/import', employees.create);
 
    app.get('/api/employees/:loginId', auth.checkIfAuthenicated, employees.findForUser);
 
    app.get('/api/employees/search/:employeeId', auth.checkIfAuthenicated, employees.findById);

    app.get('/api/admin/employees', auth.checkIfAuthenicated, employees.findAll)

    app.post('/api/employees/update', auth.checkIfAuthenicated, employees.update)

    app.post('/api/admin/employees/delete', auth.checkIfAuthenicated, employees.delete)
}