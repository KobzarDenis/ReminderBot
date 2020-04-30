import {IController, Register, Route, Service} from "../core/controller";
import {COMMANDS, TelegramBot} from "@core/net";
import {Logger} from "@core/logger";
import {NoteService} from "../services/Note.service";

@Register(TelegramBot)
export class NoteBotController implements IController {
    public service: NoteService;

    constructor() {
        this.service = new NoteService();
    }

    // @ts-ignore
    @Route({path: COMMANDS.NOTE.LIST})
    public async list(data): Promise<any> {
        Logger.getInstance().info("INVOKED: list");

        return this.service.list(data);
    }

    // @ts-ignore
    @Route({path: COMMANDS.NOTE.CREATE})
    public async create(data): Promise<any> {
        Logger.getInstance().info("INVOKED: create");

        return this.service.create(data);
    }

    // @ts-ignore
    @Route({path: COMMANDS.NOTE.UPDATE})
    public async update(data): Promise<any> {
        Logger.getInstance().info("INVOKED: update");

        return this.service.update(data);
    }

    // @ts-ignore
    @Route({path: COMMANDS.NOTE.DELETE})
    public async delete(data): Promise<any> {
        Logger.getInstance().info("INVOKED: delete");

        return this.service.delete(data);
    }


}
