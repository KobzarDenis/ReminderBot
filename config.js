module.exports = {
    telegram: {
        token: "1045742086:AAHmPm8SE1zvPohbSIOVSympdGlMkud0PpU"
    },
    server: {
        port: process.env.PORT || 8080
    },
    logger: {
        level: "verbose",
        logsFile: "logs/combined.log",
        errorsFile: "logs/errors.log"
    },
    database: {
        seederStorage: "sequelize",
        migrationStorage: "sequelize",
        url: process.env.DATABASE_URL || "postgres://localhost:5433/reminder",
        dialect: "postgres",
        dialectOptions: {
            ssl: process.env.NODE_ENV !== 'dev'
        }
    }
};
