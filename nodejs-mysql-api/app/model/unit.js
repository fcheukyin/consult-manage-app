module.exports = (sequelize, Sequelize) => {
    const Unit = sequelize.define('unit', {
        unitName: {
            type: Sequelize.STRING,
            field: 'name'
        }
    });

    return Unit;
}