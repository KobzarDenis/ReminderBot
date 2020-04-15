import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo
} from "sequelize-typescript";
import { ClientModel } from "./Client.model";

@Table({
    timestamps: false,
    paranoid: false,
    freezeTableName: true,
    tableName: "userStates",
    schema: "clients"
})
export class UserStateModel extends Model<UserStateModel> {
    @ForeignKey(() => ClientModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @Column({
        type: DataType.STRING,
        allowNull: false
    })
    public state: Date;

    @Column({
        type: DataType.ENUM("unknown", "agree", "uncertainty", "block", "discard"),
        allowNull: false
    })
    public mood: Date;

    @BelongsTo(() => ClientModel)
    public user: ClientModel;

}
