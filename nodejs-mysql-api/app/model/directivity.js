module.exports = (sequelize, Sequelize) => {
    const Directivity = sequelize.define('directivity', {
        directivityName: {
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
        },
    });

    return Directivity;
}