import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo, CreatedAt
} from "sequelize-typescript";
import { UserModel } from "./User.model";
import { WeeklyNoteModel } from "./WeeklyNote.model";

@Table({
    paranoid: false,
    freezeTableName: true,
    tableName: "notes",
    schema: "notes"
})
export class NoteModel extends Model<NoteModel> {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @Column({
        type: DataType.BOOLEAN,
        allowNull: false,
        defaultValue: false
    })
    public isCompleted: Date;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public title: string;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public description: string;

    @Column({
        type: DataType.ARRAY,
        allowNull: false,
        defaultValue: []
    })
    public tags: string[];

    @Column({
        type: DataType.ENUM("new", "archived", "persistent"),
        allowNull: false,
        defaultValue: "new"
    })
    public status: string;

    @Column({
        type: DataType.INTEGER,
        allowNull: false,
        defaultValue: 15
    })
    public estimatedTime: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public link: string;

    @CreatedAt
    public createdAt: Date;

    @BelongsTo(() => UserModel)
    public user: UserModel;

    @BelongsTo(() => WeeklyNoteModel)
    public weeklyNotes: WeeklyNoteModel;

}
