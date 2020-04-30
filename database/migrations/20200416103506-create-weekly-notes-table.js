'use strict';

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('weeklyNotes', {
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
            notes: {
                type: Sequelize.DataTypes.ARRAY(Sequelize.DataTypes.INTEGER),
                allowNull: false
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.NOW
            }
        }, {schema: 'notes'});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('weeklyNotes');
    }
};
