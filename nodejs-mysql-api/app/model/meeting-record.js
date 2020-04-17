module.exports = (sequelize, Sequelize) => {
    const MeetingRecord = sequelize.define('meeting_record', {
        category: {
            type: Sequelize.STRING,
            field: 'category'
        },
        content: {
            type: Sequelize.TEXT,
            field: 'content'
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
            feild: 'createdAt'
        },
        updatedAt: {
            type: Sequelize.DATE,
            feild: 'updatedAt'
        },

    });

    return MeetingRecord;
}