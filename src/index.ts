import {StatController} from "./controllers/Stat.controller";
import {NoteController} from "./controllers/Note.controller";
import {ExpressServer} from "./core/net/Express.server";
import {TelegramBot} from "./core/net/bots/Telegram.bot";

const tgBot = new TelegramBot("");
const expressServer = new ExpressServer(null);
const statController = new StatController();
const noteController = new NoteController();
