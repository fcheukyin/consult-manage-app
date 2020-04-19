module.exports = (sequelize, Sequelize) => {
    const Reviewer = sequelize.define('reviewer', {
        firstName: {
            type: Sequelize.STRING
        },
        lastName: {
            type: Sequelize.STRING
        },
        firstnameKana: {
            type: Sequelize.STRING,
            field: 'firstname_kana'
        },
        lastnameKana: {
            type: Sequelize.STRING,
            field: 'lastname_kana'
        },
        email: {
            type: Sequelize.STRING
        },
        password: {
            type: Sequelize.STRING
        },
        groupId: {
            type: Sequelize.INTEGER,
            field: 'group_id'
        },
        unitId: {
            type: Sequelize.INTEGER,
            field: 'unit_id'
        },
        positionId: {
            type: Sequelize.INTEGER,
            field: 'position_id'
        },
        deletedAt: {
            type: Sequelize.DATE
        },
        createdAt: {
            type: Sequelize.DATE
        },
        updatedAt: {
            type: Sequelize.DATE
        }
    });

    return Reviewer;
}