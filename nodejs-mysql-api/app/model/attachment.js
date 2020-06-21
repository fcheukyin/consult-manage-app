module.exports = (sequelize, Sequelize) => {
    const Attachment = sequelize.define('attachment', {
        unitName: {
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

    return Attachment;
}