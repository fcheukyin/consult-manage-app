module.exports = (sequelize, Sequelize) => {
    const Charm = sequelize.define('charm', {
        charmName: {
            type: Sequelize.STRING,
            field: 'name'
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

    return Charm;
}