module.exports = function(app) {
 
    const employees = require('../controller/employee.controller.js');
 
    // Create a new Customer
    app.post('/api/employees', employees.create);
 
    // Retrieve all Customer
    app.get('/api/employees', employees.findAll);
 
    // Retrieve a single Customer by Id
    app.get('/api/employees/:employeeId', employees.findById);
 
    // Update a Customer with Id
    app.put('/api/employees', employees.update);
 
    // Delete a Customer with Id
    app.delete('/api/employees/:employeeId', employees.delete);
}