import {Controller, Register, Route} from "../core/controller";
import {ExpressServer, ROUTS} from "@core/net";
import {Logger} from "@core/logger";

@Register(ExpressServer)
export class StatController extends Controller {

    constructor() {
        super();
        Logger.getInstance().info('-- ORIG constructor invoked --');
    }

    // @ts-ignore
    @Route({method: "get", path: ROUTS.STATISTIC.WEEKLY})
    public async getWeekStat(): Promise<any> {
        Logger.getInstance().info("INVOKED: getWeekStat");

        const stat: any[] = [];
        for (let i = 0; i < 10; i++) {
            const note = {title: `NOTE_TITLE_${i}`, createdAt: new Date().toISOString()};
            stat.push(note);
        }
        return stat
    }

}
