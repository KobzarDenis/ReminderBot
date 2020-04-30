import {EventEmitter} from "events";
import {Logger} from "@core/logger";
import {IRoute, IServer} from "../IServer";


export type IncomingMessage = {
    id: number,
    command: string,
    payload: any,
    chat: {
        id: number,
        firstName: string,
        lastName: string
    },
    userId: string,
    original: string
};

export enum BotName {
    Telegram = 'telegram'
}

export type Button = {
    text: string;
    value: string;
};

export const enum CommandType {
    COMMAND = "/",
    CALLBACK = "_",
    KEYBOARD = "K"
}

export abstract class Bot extends EventEmitter implements IServer {

    public routs: Map<IRoute, Function>;
    private COMMAND_DELIMITER_INDEX = 0;

    public async handleRequest(message: IncomingMessage) {
        Logger.getInstance().info("HANDLE REQUEST BOT");
        Logger.getInstance().info(`NEW EVENT [${message.chat.id}] { action: ${message.command}, chatId: ${message.chat.id}, name: ${message.chat.firstName}}`);
        this.emit(message.command, message);
    }

    private async processText(message: IncomingMessage) {
        Logger.getInstance().info(`NEW TEXT [${message.chat.id}] { chatId: ${message.chat.id}, name: ${message.chat.firstName}, text: ${message.original}}`);
        Logger.getInstance().info("PROCESS TEXT BOT");
    }

    protected async onAction(message: IncomingMessage) {
        const messageString = JSON.stringify(message);
        switch (message.command[this.COMMAND_DELIMITER_INDEX]) {
            case CommandType.CALLBACK:
                Logger.getInstance().info(`INCOMING CALLBACK: ${messageString}`);
                this.handleRequest(message);
                break;
            case CommandType.COMMAND:
                Logger.getInstance().info(`INCOMING COMMAND: ${messageString}`);
                this.handleRequest(message);
                break;
            case CommandType.KEYBOARD:
                Logger.getInstance().info(`INCOMING KEYBOARD: ${messageString}`);
                this.handleRequest(message);
                break;
            default:
                Logger.getInstance().info(`INCOMING PLAIN MESSAGE: ${messageString}`);
                this.handleRequest(message);
                this.processText(message);
                break;
        }
    }

    protected abstract parseMessage(msg: any): IncomingMessage;

    protected abstract buttonsBuilder(template: Button | Button[]);

    public abstract async sendMessage(chatId: string | number, message: string, buttons?: Button | Button[]): Promise<number>;

    public register() {
        for (const route of this.routs.keys()) {
            Logger.getInstance().info(`BOT REGISTERED HANDLER - route: [${route.path}]`);
            const baseHandler = this.routs.get(route);
            // @ts-ignore
            this.on(route.path, async (msg: IncomingMessage) => {
                // @ts-ignore
                const result = await baseHandler(msg);
                this.sendMessage(msg.chat.id, JSON.stringify(result));
            });
        }
    }

}
