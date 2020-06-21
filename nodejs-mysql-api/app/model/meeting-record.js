module.exports = (sequelize, Sequelize) => {
    const MeetingRecord = sequelize.define('meeting_record', {
        category: {
            type: Sequelize.STRING,
            field: 'category'
        },
        content: {
            type: Sequelize.TEXT,
            field: 'text'
        },
        employeeId: {
            type: Sequelize.INTEGER,
            field: 'employee_id'
        },
        reviewerId: {
            type: Sequelize.INTEGER,
            field: 'reviewer_id'
        },
        meetingDate: {
            type: Sequelize.DATE,
            field: 'meeting_date'
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

    return MeetingRecord;
}