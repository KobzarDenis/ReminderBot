import {IServer, IRoute} from "../net";

export const Route = (route: IRoute) => {
    return (target: Function, key: string, descriptor: PropertyDescriptor) => {
        if (!target.constructor["routs"]) {
            target.constructor["routs"] = new Map<string, Function>();
        }
        target.constructor["routs"].set(route, descriptor.value.bind(target));
    }
}

export const Register = (server) => {
    return (constructorFunction: Function) => {

        if(!server.prototype.routs) {
            server.prototype.routs = constructorFunction["routs"];
        } else {
            const mapRouts = new Map<IRoute, Function>([...server.prototype.routs, ...constructorFunction["routs"]]);
            server.prototype.routs = mapRouts;
        }
    };
}
