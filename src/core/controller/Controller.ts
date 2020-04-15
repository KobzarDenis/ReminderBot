import {IServer} from "../net";

export abstract class Controller {
    protected constructor() {
        console.log('-- BASE constructor invoked --');
        this.register();
    }

    private register() {
        console.log('-- BASE REGISTER invoked --');
    }
}


