import {IController, Register, Route} from "../core/controller";
import {ROUTS, METHODS, ExpressServer} from "@core/net";
import {Logger} from "@core/logger";
import {AuthService} from "../services/Auth.service";

@Register(ExpressServer)
export class AuthRestController implements IController {
    public service: AuthService;

    constructor() {
        this.service = new AuthService();
    }

    // @ts-ignore
    @Route({method: METHODS.POST, path: ROUTS.AUTH.SIGN_IN})
    public async signIn(data): Promise<any> {
        Logger.getInstance().info("INVOKED: signIn");

        return await this.service.signIn(data);
    }

    // @ts-ignore
    @Route({method: METHODS.POST, path: ROUTS.AUTH.SIGN_UP})
    public async signUp(data): Promise<any> {
        Logger.getInstance().info("INVOKED: signUp");

        return await this.service.signUp(data);
    }

}
