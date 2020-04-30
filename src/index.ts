import "../pre-runner";
import * as controllers from "./controllers";
import {ExpressServer} from "./core/net/http";
import {TelegramBot} from "./core/net/bots";
import * as config from "@config";
import {Logger} from "@core/logger";

Logger.getInstance(config.logger);
new ExpressServer(config.server).start().then(() => {
    new TelegramBot(config.telegram);
    for(const name of Object.keys(controllers)) {
        new controllers[name]();
    }
});

