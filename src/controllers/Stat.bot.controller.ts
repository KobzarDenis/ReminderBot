import {IController, Register, Route} from "../core/controller";
import {COMMANDS, TelegramBot} from "@core/net";
import {Logger} from "@core/logger";
import {StatService} from "../services/Stat.service";

@Register(TelegramBot)
export class StatBotController implements IController {
    public service: StatService;

    constructor() {
        this.service = new StatService();
    }

    // @ts-ignore
    @Route({path: COMMANDS.STATISTIC.WEEKLY})
    public async getWeekStat(data): Promise<any> {
        Logger.getInstance().info("INVOKED: getWeekStat");

        return this.service.getWeeklyNotes(data);
    }

}
