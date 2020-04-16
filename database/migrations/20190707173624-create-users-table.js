'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('users', {
            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            email: {
                type: Sequelize.TEXT(100),
                allowNull: true,
                unique: true
            },
            botId: {
                type: Sequelize.STRING,
                allowNull: true
            },
            password: {
                allowNull: true,
                type: Sequelize.TEXT
            },
            salt: {
                allowNull: true,
                type: Sequelize.STRING
            },
            name: {
                allowNull: false,
                type: Sequelize.STRING
            },
            uuid: {
                type: Sequelize.TEXT(100),
                defaultValue: Sequelize.fn('uuid_generate_v4'),
                unique: true,
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        }, {schema: 'clients'});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('users');
    }
};
