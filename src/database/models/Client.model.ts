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
import {UserStateModel} from "./userState.model"
import {MeetingRequestModel} from "./meetingRequest.model"
import * as sequelize from "sequelize";
import {PendingUserModel} from "@core/models/pendingUser.model";

@DefaultScope({
  attributes: ["id", "firstName", "lastName", "botSource", "botId", "uuid"]
})
@Table({
  timestamps: true,
  paranoid: false,
  freezeTableName: true,
  tableName: "tenants",
  schema: "clients"
})
export class ClientModel extends Model<ClientModel> {
  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true
  })
  public email: string;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: true
  })
  public phoneNumber: string;

  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  public password: string;

  @Column
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  public firstName: string;

  @Column
  @Column({
    type: DataType.STRING,
    allowNull: true
  })
  public lastName: string;

  @Column({
    type: DataType.ENUM(["telegram"]),
    allowNull: true
  })
  public botSource: string;

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

  // @HasMany(() => MeetingRequestModel)
  // public meetingRequests: MeetingRequestModel[]
  //
  // @HasOne(() => UserStateModel)
  // public state: UserStateModel
  //
  // @HasOne(() => PendingUserModel)
  // public pending: PendingUserModel

}
