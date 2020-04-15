export interface IDatabase {
    openConnection: (options: any) => void;
    closeConnection: () => void;
}
