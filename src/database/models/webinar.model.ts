import {
  BelongsTo, BelongsToMany,
  Column,
  DataType,
  DefaultScope,
  HasMany, HasOne,
  Model,
  Table
} from "sequelize-typescript";
import * as sequelize from "sequelize";
import {ClientModel} from "@core/models/Client.model";
import {MeetingRequestModel} from "@core/models/meetingRequest.model";
import {UserWebinarModel} from "@core/models/userWebinar.model";

@DefaultScope({
  attributes: ["id", "email", "phoneNumber", "firstName", "lastName", "botSource", "botId", "lang", "uuid"]
})
@Table({
  timestamps: true,
  paranoid: false,
  freezeTableName: true,
  tableName: "webinars",
  schema: "clients"
})
export class WebinarModel extends Model<WebinarModel> {
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  public link: string;

  @Column({
    type: DataType.DATE,
    allowNull: false
  })
  public date: Date;

  @HasMany(() => UserWebinarModel, MeetingRequestModel)
  public meetingRequests: MeetingRequestModel[]

  @HasMany(() => UserWebinarModel, ClientModel)
  public users: ClientModel[]

}
