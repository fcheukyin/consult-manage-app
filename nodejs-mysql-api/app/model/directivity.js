module.exports = (sequelize, Sequelize) => {
    const Directivity = sequelize.define('directivity', {
        directivityName: {
            type: Sequelize.STRING,
            field: 'name'
        }
    });

    return Directivity;
}