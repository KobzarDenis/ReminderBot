import * as  express from 'express';
import * as  bodyParser from 'body-parser';
import * as  cookieParser from 'cookie-parser';
import {IRoute, IServer} from "./IServer";
import {Server} from "https";
import {Logger} from "@core/logger";

export class ExpressServer implements IServer {

    public routs: Map<IRoute, Function>;
    private server: any;
    private app: any;

    constructor(private config?: any) {
        this.server = null;
        this.app = null;
        this.init();
        this.register();
    }

    private init() {
        this.app = express();
        this.app.use((req, res, next) => {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, x-user-key, Content-Type, Accept");
            res.header("Access-Control-Expose-Headers", "x-session-id");
            next();
        });
        this.app.use(bodyParser.json({limit: '50mb'}));
        this.app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
        this.app.use(cookieParser());
    }

    private wrapHandler(handler) {
        return async (req, res, next) => {
            try {
                const params = req.method === "GET" ? req.params : req.body;
                const data = await handler(params);
                res.status(200);
                res.json({data});
            } catch (error) {
                res.status(error.code);
                res.json({error: error.message});
            }
        };
    }

    public async start(): Promise<Server> {
        return new Promise((resolve) => {
            this.server = this.app.listen(this.config.port, () => {
                Logger.getInstance().info(`ExpressServer listening on ${this.config.port}`);
                resolve(this.server);
            });
        });
    }

    public register() {
        for (const route of this.routs.keys()) {
            Logger.getInstance().info(`EXPRESS REGISTERED HANDLER - method: [${route.method}], route: [${route.path}]`);
            const baseHandler = this.routs.get(route);
            const handler = this.wrapHandler(baseHandler)
            this.app[<string>route.method](route.path, handler);
        }
    }

};
