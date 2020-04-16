'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('profileSettings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: {
            tableName: "users",
            schema: "clients"
          },
          key: "id"
        }
      },
      hoursForLearningPerWeek: {
        type: Sequelize.DataTypes.INTEGER,
        allowNull: false
      }
    }, {schema: 'clients'});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('profileSettings');
  }
};
