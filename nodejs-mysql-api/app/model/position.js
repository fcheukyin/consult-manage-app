module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define('position', {
        positionName: {
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

    return Position;
}