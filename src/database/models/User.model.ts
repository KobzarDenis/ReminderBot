import {
    Column,
    CreatedAt,
    DataType,
    DefaultScope,
    HasMany,
    Model,
    Table,
    UpdatedAt, HasOne
} from "sequelize-typescript";
import * as sequelize from "sequelize";
// import {ProfileSettingsModel} from "@core/models/ProfileSettings.model";
// import {NotesModel} from "@core/models/Notes.model";
// import {PersistentNotesModel} from "@core/models/PersistentNotes.model";

@DefaultScope({
    attributes: ["id", "firstName", "lastName", "botSource", "botId", "uuid"]
})
@Table({
    timestamps: true,
    paranoid: false,
    freezeTableName: true,
    tableName: "user",
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

    // @HasMany(() => NotesModel)
    // public notes: NotesModel[];
    //
    // @HasMany(() => PersistentNotesModel)
    // public persistentNotes: PersistentNotesModel[];
    //
    // @HasOne(() => ProfileSettingsModel)
    // public profileSettings: ProfileSettingsModel;

}
