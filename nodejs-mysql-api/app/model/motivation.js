module.exports = (sequelize, Sequelize) => {
    const Motivation = sequelize.define('motivation', {
        motivationName: {
            type: Sequelize.STRING,
            field: 'name'
        }
    });

    return Motivation;
}