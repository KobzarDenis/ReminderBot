import {
    Column,
    CreatedAt,
    DataType,
    DefaultScope,
    HasMany,
    Model,
    Table,
    UpdatedAt, HasOne, Scopes
} from "sequelize-typescript";
import * as sequelize from "sequelize";
import {NoteModel} from "./Notes.model";
import {WeeklyNoteModel} from "./WeeklyNote.model";
import {ProfileSettingsModel} from "./ProfileSettings.model";

@DefaultScope({
    attributes: ["id", "name", "botId", "uuid"]
})
@Scopes({
    weeklyRead: {
        attributes: ["id", "name", "botId", "uuid"],
        include: [{
            model: () => WeeklyNoteModel
        }]
    }
})
@Table({
    timestamps: true,
    paranoid: false,
    freezeTableName: true,
    tableName: "users",
    schema: "clients"
})
export class UserModel extends Model<UserModel> {
    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: true
    })
    public email: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    public password: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    public salt: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    public name: string;

    @Column({
        type: DataType.STRING,
        allowNull: true
    })
    public botId: string;

    @Column({
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        defaultValue: sequelize.fn('uuid_generate_v4'),
    })
    public uuid: string;

    @CreatedAt
    public createdAt: Date;

    @UpdatedAt
    public updatedAt: Date;

    @HasOne(() => ProfileSettingsModel)
    public profileSettings: ProfileSettingsModel;

    @HasMany(() => NoteModel)
    public notes: NoteModel[];

    @HasMany(() => WeeklyNoteModel)
    public weeklyNotes: WeeklyNoteModel[];

}
