module.exports = (sequelize, Sequelize) => {
    const Admin = sequelize.define('admin', {
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_date'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_date'
        }
    });
    return Admin;
}