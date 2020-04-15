import {Controller, Register, Route} from "../core/controller";
import {ExpressServer} from "../core/net";

const enum Routs {
    GET_WEEK_STAT = "/stat/week"
}

@Register(ExpressServer)
export class StatController extends Controller {

    constructor() {
        super();
        console.log('-- ORIG constructor invoked --');
    }

    // @ts-ignore
    @Route({method: "GET", route: Routs.GET_WEEK_STAT})
    // @ts-ignore
    public async getWeekStat(): Promise<string> {
        console.log("INVOKED: getWeekStat");
        return "bravo";
    }


}
