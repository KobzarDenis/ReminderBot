import * as TelegramAPI from "node-telegram-bot-api";
import {IncomingMessage, Button, Bot} from "./Bot";
import {Logger} from "@core/logger/Logger";

export class TelegramBot extends Bot {

    private bot: TelegramAPI;
    public static _instance: TelegramBot;

    constructor(config) {
        super();
        this.bot = new TelegramAPI(config.token, {polling: true});
        this.init();
    }

    // ToDO: CHECK OUT THIS
    public async test(msg): Promise<any> {
        const testLink = "https://www.altexsoft.com/blog/business/functional-and-non-functional-requirements-specification-and-types/";
        const testHtml = `<a href="${testLink}">NFR.You SHOULD READ.</a>`;
        const testMarkdown = "```" +
            `
            await this.bot.sendMessage(msg.chat.id, testHtml, {parse_mode: "HTML"});
            await this.bot.sendMessage(msg.chat.id, testHtml2, {parse_mode: "MarkdownV2"});
            await this.bot.deleteMessage(msg.chat.id, msg.message_id);
            `
            + "```";

        await this.bot.sendMessage(msg.chat.id, testHtml, {parse_mode: "HTML", disable_web_page_preview: true});
        // await this.bot.sendMessage(msg.chat.id, testMarkdown, {parse_mode: "MarkdownV2"});
        await this.bot.deleteMessage(msg.chat.id, msg.message_id);
    }

    public static getInstance(token?: string): TelegramBot {
        if (!TelegramBot._instance) {
            if (!token) {
                throw new Error(`Missing params`);
            }

            TelegramBot._instance = new TelegramBot(token);
        }

        return TelegramBot._instance;
    }


    public init() {
        this.bot.on('message', async (msg) => await super.onAction(this.parseMessage(msg)));
        this.bot.on('callback_query', async (msg) => await super.onAction(this.parseMessage(msg)));
        super.register();
    }

    public buttonsBuilder(template: Button | Button[]) {
        if (template) {
            const options = {
                reply_markup: "{}",
                resize_keyboard: true,
                one_time_keyboard: true
            };

            const inline_keyboard: any[] = [];

            if (Array.isArray(template)) {
                template.forEach(b => {
                    inline_keyboard.push([{
                        text: b.text,
                        callback_data: b.value
                    }]);
                })
            } else {
                inline_keyboard.push([{
                    text: template.text,
                    callback_data: template.value
                }]);
            }

            options.reply_markup = JSON.stringify({inline_keyboard, hide_keyboard: true});

            return options;
        }
    }

    public async sendMessage(chatId: string | number, message: string, buttons?: Button | Button[]): Promise<number> {
        let msgId: number;

        if (buttons) {
            const options = this.buttonsBuilder(buttons);
            msgId = await this.bot.sendMessage(chatId, message, options);
        } else {
            msgId = await this.bot.sendMessage(chatId, message);
        }

        return msgId;
    }

    protected parseMessage(msg: any): IncomingMessage {
        const original = msg.text ? msg.text.trim() : msg.data.trim();
        const parsed = original.split(':');
        const commandAndId = parsed[0].split(' ');

        const chat = msg.chat || msg.message.chat;

        let message: IncomingMessage = {
            id: msg.message_id || msg.message.message_id,
            chat: {
                id: chat.id,
                firstName: chat.first_name,
                lastName: chat.last_name
            },
            command: commandAndId[0].trim(),
            userId: commandAndId.length > 1 ? commandAndId[1].trim() : null,
            payload: parsed[1] ? parsed[1].split('_').map(val => val.trim()) : null,
            original
        };

        return message;
    }

    public async start(message: IncomingMessage) {
        const testLink = "https://www.altexsoft.com/blog/business/functional-and-non-functional-requirements-specification-and-types/";
        const testHtml = `<a href="${testLink}">NFR.You SHOULD READ.</a>`;

        await this.bot.sendMessage(message.chat.id, testHtml, {parse_mode: "HTML", disable_web_page_preview: true});
        await this.bot.deleteMessage(message.chat.id, message.id);

        // Logger.info(`NEW USER WAS STARTED [${data.userId}]`);

        const options = {
            reply_markup: JSON.stringify({
                keyboard: [
                    [{text: 'KСоздать новость'}],
                    [{text: 'KСписок за неделю'}]
                ]
            })
        };

        this.bot.sendMessage(message.chat.id, message, options);
    }

    public async help(data: IncomingMessage) {
        const options = {
            reply_markup: JSON.stringify({
                inline_keyboard: [
                    [{text: 'Как это работает ?', callback_data: 1}],
                    [{text: 'Что я могу с этим делать ?', callback_data: 2}],
                ]
            })
        };

        this.bot.sendMessage(data.chat.id, 'Выберите Ваш вопрос:', options);
    }

    async setUpMenu(chatId) {
        const buttons = {
            reply_markup: JSON.stringify({
                keyboard: [
                    [{
                        text: "Something 1"
                    }],
                    [{
                        text: "Something 2"
                    }]
                ]
            }),
            resize_keyboard: true
        };

        await this.bot.sendMessage(chatId, "Welcome to the Club! =)", buttons);
    }
}
