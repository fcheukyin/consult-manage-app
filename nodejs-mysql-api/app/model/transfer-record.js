module.exports = (sequelize, Sequelize) => {
    const TransferRecord = sequelize.define('transfer_record', {
        employeeId: {
            type: Sequelize.INTEGER,
            field: 'employee_id'
        },
        oldReviewerId: {
            type: Sequelize.INTEGER,
            field: 'old_reviewer_id'
        },
        oldGroupId: {
            type: Sequelize.INTEGER,
            field: 'old_group_id'
        },
        oldUnitId: {
            type: Sequelize.INTEGER,
            field: 'old_unit_id'
        },
        newReviewerId: {
            type: Sequelize.INTEGER,
            field: 'new_reviewer_id'
        },
        newGroupId: {
            type: Sequelize.INTEGER,
            field: 'new_group_id'
        },
        newUnitId: {
            type: Sequelize.INTEGER,
            field: 'new_unit_id'
        },
        transferDate: {
            type: Sequelize.DATE,
            field: 'transfer_date'
        },
        createdAt: {
            type: Sequelize.DATE,
            feild: 'createdAt'
        },
        updatedAt: {
            type: Sequelize.DATE,
            feild: 'updatedAt'
        },

    });

    return TransferRecord;
}