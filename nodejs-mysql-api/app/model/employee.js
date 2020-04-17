module.exports = (sequelize, Sequelize) => {

    const Employee = sequelize.define('employee', {
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
      route: {
        type: Sequelize.STRING,
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
        field: 'unit_id'
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
        type: Sequelize.DATE
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });

    return Employee;
  }