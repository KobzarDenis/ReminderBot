import {Logger} from "@core/logger";

export abstract class Controller {
    protected constructor() {
        Logger.getInstance().info('-- BASE constructor invoked --');
    }
}


