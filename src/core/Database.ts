import * as fs from "fs-extra";
import * as path from "path";
import {Model, ModelCtor, Sequelize} from "sequelize-typescript";
import {Logger} from "../core/logger/Logger";
import {IDatabase} from "@core/interfaces/IDatabase";

/**
 * Database - class to work with sequelize
 * All available connections will store to "connections" except default connection
 * You can create connection by "createConnection" function(when name not transferred the connection is default)
 * You can get any connection by "getConnection" or call this function without name and get default connection
 */
export class Database implements IDatabase {
    public sequelize: Sequelize;

    private static instance: Database;
    private readonly databaseParams;
    private models: ModelCtor[];
    private connections: Map<string, Sequelize>;
    private logger: Logger;

    private constructor(dbParams) {
        this.logger = Logger.getInstance();
        this.models = [];
        this.connections = new Map<string, Sequelize>();
        this.databaseParams = dbParams;
        this.openConnection(dbParams);
    }

    public static getInstance(dbParams?): Database {
        if (dbParams) {
            if (!Database.instance) {
                Database.instance = new Database(dbParams);
            }
        } else {
            if (!Database.instance) {
                throw new Error(`Empty instance. Missing parameters!`);
            }
        }
        return Database.instance;
    }

    /**
     * Function to create new database connection
     * Create named connection and save to connections array,
     * if name is not specified - create default connection
     * @param name
     * @param connectOptions
     * @returns {Sequelize}
     */
    public openConnection(connectOptions) {
        this.sequelize = new Sequelize(this.prepareParams(this.databaseParams));
    }

    public closeConnection() {
        this.sequelize.close();
    }

    /**
     * Function to find all models in transferred path and include to Sequlize instance
     * Can recursive search
     * Files should be in format: "example.model.ts"
     * @param {string} modelsPath
     * @returns {Promise<void>}
     */
    public injectModels(modelsPath: string) {
        this.recursiveInject(modelsPath);
        try {
            this.sequelize.addModels(this.models);
        } catch (e) {
            throw new Error(e);
        }
    }

    /**
     * Function to custom adding model to Sequelize
     * @param {string | Model} model - can be a Model class or path to one model
     */
    public addModel(model: string) {
        try {
            if (typeof model === "string") {
                const importedModel = require(model);
                const modelName = (Object.keys(importedModel))[0];
                this.models.push(importedModel[modelName]);
                this.logger.info(`Model registered: ${modelName}`);
            } else {
                this.models.push(model);
            }
        } catch (err) {
            this.logger.error(err);
            this.logger.error("Error in model: " + model);
        }
    }

    private prepareParams(connectOptions) {
        let params: any = {
            operatorsAliases: false,
            logging: this.logger.verbose.bind(this.logger)
        };
        if (connectOptions.url) {
            params.url = connectOptions.url;
            params.dialect = connectOptions.dialect;
            params.dialectOptions = connectOptions.dialectOptions;
            return params;
        }
        params = Object.assign(params, {
            name: connectOptions.database,
            dialect: connectOptions.dialect,
            host: connectOptions || process.env.DB_HOST,
            username: connectOptions.username,
            password: connectOptions.password,
            dialectOptions: connectOptions.dialectOptions
        });
        return params;
    }

    private recursiveInject(modelsPath?: string) {
        try {
            if (!modelsPath) {
                return;
            }
            const files = fs.readdirSync(modelsPath);

            for (const file of files) {
                const fileStat = fs.statSync(path.join(modelsPath, file));
                if (fileStat.isDirectory()) {
                    this.recursiveInject(path.join(modelsPath, file));
                }
                if ((path.extname(file) !== ".js" && path.extname(file) !== ".ts") || file.indexOf("model") === -1) {
                    continue;
                }
                this.addModel(path.join(modelsPath, file));
            }
        } catch (e) {
            throw new Error(e);
        }
    }
}
