import {IServer, IRoute} from "../net";

export const Route = (route: IRoute) => {
    return (target: Function, key: string, descriptor: PropertyDescriptor) => {
        if(!target.constructor["routs"]) {
            target.constructor["routs"] = new Map<string, Function>();
        }
        target.constructor["routs"].set(route, descriptor.value.bind(target));
    }
}

export const Register = (server) => {
    return (constructorFunction: Function) => {
        server.prototype.routs = constructorFunction["routs"];
    };
}
