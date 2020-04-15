import "../pre-runner";
import {StatController} from "./controllers/Stat.controller";
import {NoteController} from "./controllers/Note.controller";
import {ExpressServer} from "./core/net/Express.server";
import {TelegramBot} from "./core/net/bots/Telegram.bot";
import * as config from "@config";
import {Logger} from "@core/logger";

Logger.getInstance(config.logger);
new ExpressServer(config.server).start().then(() => {
    new TelegramBot(config.telegram);
    new StatController();
    new NoteController();
});

