module.exports = (sequelize, Sequelize) => {
    const Reviewer = sequelize.define('reviewer', {
        firstName: {
            type: Sequelize.STRING,
            field: 'first_name'
        },
        lastName: {
            type: Sequelize.STRING,
            field: 'last_name'
        },
        firstnameKana: {
            type: Sequelize.STRING,
            field: 'first_name_ka'
        },
        lastnameKana: {
            type: Sequelize.STRING,
            field: 'last_name_ka'
        },
        email: {
            type: Sequelize.STRING,
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
            field: 'attachment_id'
        },
        positionId: {
            type: Sequelize.INTEGER,
            field: 'position_id'
        },
        deletedAt: {
            type: Sequelize.DATE,
            field: 'deleted_date'
        },
        createdAt: {
            type: Sequelize.DATE,
            field: 'created_date'
        },
        updatedAt: {
            type: Sequelize.DATE,
            field: 'updated_date'
        }
    });

    return Reviewer;
}