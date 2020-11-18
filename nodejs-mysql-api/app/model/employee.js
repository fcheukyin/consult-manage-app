module.exports = (sequelize, Sequelize) => {

    const Employee = sequelize.define('employee', {
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
        field: 'first_name_kana'
      },
      lastnameKana: {
        type: Sequelize.STRING,
        field: 'last_name_kana'
      },
      route: {
        type: Sequelize.STRING,
        field: 'train'
      },
      station: {
        type: Sequelize.STRING
      },
      family: {
        type: Sequelize.STRING
      },
      prefectureId: {
        type: Sequelize.INTEGER,
        field: 'prefecture_id'
      },
      directivityId: {
        type: Sequelize.INTEGER,
        field: 'directivity_id'
      },
      charmId: {
        type: Sequelize.INTEGER,
        field: 'charm_id'
      },
      motivationId: {
        type: Sequelize.INTEGER,
        field: 'motivation_id'
      },
      reviewerId: {
        type: Sequelize.INTEGER,
        field: 'reviewer_id'
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
      charmId: {
        type: Sequelize.INTEGER,
        field: 'charm_id'
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

    return Employee;
  }