module.exports = (sequelize, Sequelize) => {
    const Position = sequelize.define('position', {
        positionName: {
            type: Sequelize.STRING,
            field: 'name'
        }
    });

    return Position;
}