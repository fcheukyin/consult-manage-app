module.exports = (sequelize, Sequelize) => {
    const Motivation = sequelize.define('motivation', {
        motivationName: {
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

    return Motivation;
}