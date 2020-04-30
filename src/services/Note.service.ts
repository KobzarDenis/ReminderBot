import {IService} from "./IService";

// ToDo: Add data types!!!
export class NoteService implements IService {

    public async findOne(data) {
        return {test: new Date().toISOString(), data};
    }

    public async list(data) {
        return {test: new Date().toISOString(), data};
    }

    public async create(data) {
        return {test: new Date().toISOString(), data};
    }

    public async update(data) {
        return {test: new Date().toISOString(), data};
    }

    public async delete(data) {
        return {test: new Date().toISOString(), data};
    }

}
