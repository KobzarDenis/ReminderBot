import {Controller, Register, Route} from "../core/controller";
import {TelegramBot, ROUTS} from "@core/net";
import {Logger} from "@core/logger";

@Register(TelegramBot)
export class NoteController extends Controller {

    constructor() {
        super();
        Logger.getInstance().info('-- ORIG constructor invoked --');
    }

    // @ts-ignore
    @Route({path: ROUTS.NOTE.CREATE})
    public async createNote(): Promise<any> {
        Logger.getInstance().info("INVOKED: createNote");

        return {test: new Date().toISOString()}
    }


}
