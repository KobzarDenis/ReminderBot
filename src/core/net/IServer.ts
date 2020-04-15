export interface IRoute {
    path: string;
    method?: string;
}

export interface IServer {
    routs: Map<IRoute, Function>,
    register: (route: string, handler: Function) => void;
}
