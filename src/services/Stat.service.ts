import {IService} from "./IService";

// ToDo: Add data types!!!
export class StatService implements IService {

    public async getWeeklyNotes(data) {
        const stat: any[] = [];
        for (let i = 0; i < 10; i++) {
            const note = {title: `NOTE_TITLE_${i}`, createdAt: new Date().toISOString()};
            stat.push(note);
        }
        return [stat, data];
    }

}
