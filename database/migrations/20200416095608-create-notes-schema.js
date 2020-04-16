'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createSchema('notes');
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropSchema('notes');
    }
};
