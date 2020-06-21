module.exports = (sequelize, Sequelize) => {
    const Group = sequelize.define('group', {
        groupName: {
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

    return Group;
}