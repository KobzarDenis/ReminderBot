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
    timestamps: false,
    freezeTableName: true,
    tableName: "profileSettings",
    schema: "clients"
})
export class ProfileSettingsModel extends Model<ProfileSettingsModel> {
    @ForeignKey(() => UserModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public hoursForLearningPerWeek: number;

    @BelongsTo(() => UserModel)
    public user: UserModel;

}
