module.exports = function(app) {
 
    const employees = require('../controller/employee.controller.js');
    const auth = require('../controller/auth.controller.js');
 
    // Create a new Customer
    app.post('/api/employees', employees.create);
 
    app.get('/api/employees/:loginId', auth.checkIfAuthenicated, employees.findAll);
 
    app.get('/api/employees/search/:employeeId', auth.checkIfAuthenicated, employees.findById);

    app.put('/api/employees', employees.update);

    app.delete('/api/employees/:employeeId', employees.delete);
}