'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('notes', {
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
            isCompleted: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },
            title: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            description: {
                type: Sequelize.DataTypes.TEXT,
                allowNull: false,
            },
            tags: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.STRING),
                allowNull: false,
                defaultValue: []
            },
            estimatedTime: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 15
            },
            link: {
                type: Sequelize.TEXT,
                allowNull: false,
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        }, {schema: 'notes'});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('notes');
    }
};
