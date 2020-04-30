import { IController, Register, Route} from "../core/controller";
import {ROUTS, METHODS, ExpressServer} from "@core/net";
import {Logger} from "@core/logger";
import {NoteService} from "../services/Note.service";

@Register(ExpressServer)
export class UserRestController implements IController {
    public service: NoteService;

    constructor() {
    }

    // @ts-ignore
    @Route({method: METHODS.GET, path: ROUTS.USER.LIST})
    public async list(data): Promise<any> {
        Logger.getInstance().info("INVOKED: list");

        return {test: new Date().toISOString(), data};
    }

    // @ts-ignore
    @Route({method: METHODS.GET, path: ROUTS.USER.GET})
    public async get(data): Promise<any> {
        Logger.getInstance().info("INVOKED: get");

        return {test: new Date().toISOString(), data};
    }

    // @ts-ignore
    @Route({method: METHODS.POST, path: ROUTS.USER.CREATE})
    public async create(data): Promise<any> {
        Logger.getInstance().info("INVOKED: create");

        return {test: new Date().toISOString(), data};
    }

    // @ts-ignore
    @Route({method: METHODS.PUT, path: ROUTS.USER.UPDATE})
    public async update(data): Promise<any> {
        Logger.getInstance().info("INVOKED: update");

        return {test: new Date().toISOString(), data};
    }

    // @ts-ignore
    @Route({method: METHODS.DELETE, path: ROUTS.USER.DELETE})
    public async delete(data): Promise<any> {
        Logger.getInstance().info("INVOKED: delete");

        return {test: new Date().toISOString(), data};
    }


}
