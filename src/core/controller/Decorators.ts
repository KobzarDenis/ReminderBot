import {IRoute} from "../net";

class Dependency {
    private static instanceMap: Map<string, any> = new Map<string, any>();

    public static setInstance(className: string, instance: any): void {
        if (className && instance) {
            Dependency.instanceMap.set(className, instance);
        }
    }

    public static isInstanceExists(className: string): boolean {
        return Dependency.instanceMap.has(className);
    }

    public static getInstance(className: string): any {
        if (className) {
            return Dependency.instanceMap.get(className);
        }
    }
}

export const Route = (route: IRoute) => {
    return (target: Function, key: string, descriptor: PropertyDescriptor) => {

        if (!target.constructor["routs"]) {
            target.constructor["routs"] = new Map<string, string>();
        }
        if (!Dependency.isInstanceExists(target.constructor.name)) {
            // @ts-ignore
            Dependency.setInstance(target.constructor.name, new target.constructor());
        }
        const handler = target[key].bind(Dependency.getInstance(target.constructor.name));
        target.constructor["routs"].set(route, handler);
    }
};

export const Register = (server) => {
    return (constructorFunction: Function) => {

        if (!server.prototype.routs) {
            server.prototype.routs = constructorFunction["routs"];
        } else {
            const mapRouts = new Map<IRoute, Function>([...server.prototype.routs, ...constructorFunction["routs"]]);
            server.prototype.routs = mapRouts;
        }
    };
};

export const Service = (service) => {
    const serviceInstance = new service();
    return (constructorFunction: Function) => {
        const originalConstructor = constructorFunction.prototype.constructor;
        constructorFunction.prototype.constructor = function (...args) {
            return originalConstructor(serviceInstance, ...args);
        };
    };
};
