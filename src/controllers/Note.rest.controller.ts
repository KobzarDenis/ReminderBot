import {IController, Register, Route} from "../core/controller";
import {ROUTS, METHODS, ExpressServer} from "@core/net";
import {Logger} from "@core/logger";
import {NoteService} from "../services/Note.service";

@Register(ExpressServer)
export class NoteRestController implements IController {
    public service: NoteService;

    constructor() {
        this.service = new NoteService();
    }

    // @ts-ignore
    @Route({method: METHODS.GET, path: ROUTS.NOTE.LIST})
    public async list(data): Promise<any> {
        Logger.getInstance().info("INVOKED: list");

        return this.service.list(data);
    }

    // @ts-ignore
    @Route({method: METHODS.GET, path: ROUTS.NOTE.GET})
    public async get(data): Promise<any> {
        Logger.getInstance().info("INVOKED: get");

        return this.service.findOne(data);
    }

    // @ts-ignore
    @Route({method: METHODS.POST, path: ROUTS.NOTE.CREATE})
    public async create(data): Promise<any> {
        Logger.getInstance().info("INVOKED: create");

        return this.service.create(data);
    }

    // @ts-ignore
    @Route({method: METHODS.PUT, path: ROUTS.NOTE.UPDATE})
    public async update(data): Promise<any> {
        Logger.getInstance().info("INVOKED: update");

        return this.service.update(data);
    }

    // @ts-ignore
    @Route({method: METHODS.DELETE, path: ROUTS.NOTE.DELETE})
    public async delete(data): Promise<any> {
        Logger.getInstance().info("INVOKED: delete");

        return this.service.delete(data);
    }


}
