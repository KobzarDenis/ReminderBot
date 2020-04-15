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
    tableName: "pendingUsers",
    schema: "clients"
})
export class PendingUserModel extends Model<PendingUserModel> {
    @ForeignKey(() => ClientModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @Column({
        type: DataType.ENUM("email", "phone-number"),
        allowNull: false
    })
    public type: string;

    @Column({
        type: DataType.ENUM("contacted", "not-contacted"),
        allowNull: false,
        defaultValue: "not-contacted"
    })
    public state: string;

    @Column({
        type: DataType.DATE,
        allowNull: false,
        defaultValue: () => new Date()
    })
    public date: Date;

    @BelongsTo(() => ClientModel)
    public user: ClientModel;

}
