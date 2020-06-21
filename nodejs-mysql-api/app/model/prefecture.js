module.exports = (sequelize, Sequelize) => {

    const Prefecture = sequelize.define('prefecture', {
      name: {
        type: Sequelize.STRING
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

    return Prefecture;
  }