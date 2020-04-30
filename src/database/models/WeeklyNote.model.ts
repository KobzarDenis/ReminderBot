import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo
} from "sequelize-typescript";
import {UserModel} from "./User.model";

@Table({
    timestamps: false,
    paranoid: false,
    freezeTableName: true,
    tableName: "weeklyNotes",
    schema: "notes"
})
export class WeeklyNoteModel extends Model<WeeklyNoteModel> {
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
        type: DataType.ARRAY,
        allowNull: false
    })
    public notes: number[];

    @BelongsTo(() => UserModel)
    public user: UserModel;
}
