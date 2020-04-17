module.exports = (sequelize, Sequelize) => {
    const Charm = sequelize.define('charm', {
        charmName: {
            type: Sequelize.STRING,
            field: 'name'
        }
    });

    return Charm;
}