module.exports = (sequelize, Sequelize) => {

    const Prefecture = sequelize.define('prefecture', {
      name: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE
      },
      updatedAt: {
        type: Sequelize.DATE
      }
    });

    return Prefecture;
  }