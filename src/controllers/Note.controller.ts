import {Controller, Register, Route} from "../core/controller";
import {TelegramBot} from "../core/net/bots";

const enum Routs {
    CREATE_NOTE = "/note/create"
}

@Register(TelegramBot)
export class NoteController extends Controller {

    constructor() {
        super();
        console.log('-- ORIG constructor invoked --');
    }

    // @ts-ignore
    @Route({path: Routs.CREATE_NOTE})
    // @ts-ignore
    public async createNote(): Promise<string> {
        console.log("INVOKED: createNote");
        return "bravo";
    }


}
