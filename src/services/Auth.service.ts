import {IService} from "./IService";

// ToDo: Add data types!!!
export class AuthService implements IService {

    public async signIn(data) {
        return {test: new Date().toISOString(), data};
    }

    public async signUp(data) {
        return {test: new Date().toISOString(), data};
    }

}
