import { IController, Register, Route} from "../core/controller";
import {ExpressServer, ROUTS, METHODS} from "@core/net";
import {Logger} from "@core/logger";
import {StatService} from "../services/Stat.service";

@Register(ExpressServer)
export class StatRestController implements IController {
    public service: StatService;

    constructor() {
        this.service = new StatService();
    }

    // @ts-ignore
    @Route({method: METHODS.GET, path: ROUTS.STATISTIC.WEEKLY})
    public async getWeekStat(data): Promise<any> {
        Logger.getInstance().info("INVOKED: getWeekStat");

        return this.service.getWeeklyNotes(data);
    }

}
