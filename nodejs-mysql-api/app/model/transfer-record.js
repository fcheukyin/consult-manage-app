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
            field: 'old_attachment_id'
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
            field: 'new_attachment_id'
        },
        transferDate: {
            type: Sequelize.DATE,
            field: 'transfer_date'
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

    return TransferRecord;
}