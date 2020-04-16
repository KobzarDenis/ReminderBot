import {
    Column,
    DataType,
    ForeignKey,
    Model,
    Table,
    BelongsTo
} from "sequelize-typescript";
import { ClientModel } from "./User.model";
import {MeetingRequestModel} from "@core/models/meetingRequest.model";
import {WebinarModel} from "@core/models/webinar.model";

@Table({
    timestamps: false,
    paranoid: false,
    freezeTableName: true,
    tableName: "userWebinars",
    schema: "clients"
})
export class UserWebinarModel extends Model<UserWebinarModel> {
    @ForeignKey(() => ClientModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public userId: number;

    @ForeignKey(() => WebinarModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public webinarId: number;

    @ForeignKey(() => MeetingRequestModel)
    @Column({
        type: DataType.INTEGER,
        allowNull: false
    })
    public requestId: number;

    @BelongsTo(() => ClientModel)
    public user: ClientModel;

    @BelongsTo(() => WebinarModel)
    public webinar: WebinarModel;

    @BelongsTo(() => MeetingRequestModel)
    public meetingRequest: MeetingRequestModel;

}
