/* eslint-disable no-unused-vars */
/* eslint-disable no-shadow */
// bug with no-shadow for enum
import { Field, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { CartItem } from ".";
import TimeLine from "./utils/tracking/ObjectType/Timeline";

// timlines => array of Timelin
// timeline => aray of detailtimelindedetail

export enum ETrackingStatus {
  ON_PICKED_UP = "ON_PICKED_UP",
  ON_SHIPPING = "ON_SHIPPING",
  ON_DELIVERED = "ON_DELIVERED",
  ON_UNABLE_TO_SEND = "ON_UNABLE_TO_SEND",
  ON_OTHER_STATUS = "ON_OTHER_STATUS",
}

@ObjectType()
@Entity()
class Tracking extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: number;

  // from the api
  @Field()
  @Column()
  trackingNo: string;

  @Field()
  @Column()
  courier: string;

  @Field()
  @Column()
  courierKey: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  status: string;

  @Field()
  @Column()
  currentStatus: string;

  @Field()
  @Column()
  shareLink: string;

  @Field(() => [TimeLine])
  @Column("jsonb", { nullable: true, array: false }) // has to be set to false according to https://stackoverflow.com/questions/59437390/typeorm-jsonb-array-column
  timelines: TimeLine[];

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItems) => cartItems.tracking)
  cartItems: CartItem[];

  // from ETrackings done
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

// @Field({ nullable: true })
// @Column("jsonb", { nullable: true })
// detail: Detail;

// @Column("text", { nullable: true, array: true })
// @Field(() => [String], { nullable: true })
// statusArray: string[];

// @Column("date", { nullable: true, array: true })
// @Field(() => [Date], { nullable: true })
// dateArray: Date[];

// @ObjectType()
// export class Detail {
//   @Field()
//   sender: string;
//   @Field()
//   recipient: string;
//   @Field()
//   qty: number;
//   @Field()
//   address: string;
//   @Field()
//   originCity: string;
//   @Field()
//   originProvince: string;
//   @Field()
//   originCountry: string;
//   @Field()
//   destinationCity: string;
//   @Field()
//   destinationProvince: string;
//   @Field()
//   destinationCountry: string;
//   @Field()
//   signer: string;
//   @Field()
//   signerImageURL: string;
//   @Field()
//   weight: number;
//   @Field()
//   shippingService: string;
//   @Field()
//   returnShippingService: string;
//   @Field()
//   deliveryType: number;
//   @Field()
//   packaging: string;
//   @Field()
//   senderPhoneNumber: string;
//   @Field()
//   recipientPhoneNumber: string;
//   @Field()
//   sendDate: string;
//   @Field()
//   dueDate: string;
//   @Field()
//   cashOnDelivery: string;
//   @Field()
//   isPayCashOnDelivery: boolean;
//   @Field()
//   deliveryStaffName: string;
//   @Field()
//   deliveryStaffPhoneNumber: string;
//   @Field()
//   deliveryStaffBranchPhoneNumber: string;
//   @Field()
//   senderCompany: string;
//   @Field()
//   senderAddress: string;
//   @Field()
//   recipientCompany: string;
//   @Field()
//   recipientAddress: string;
//   @Field()
//   courierTrackingNumber: string;
//   @Field()
//   courierPartner: string;

// detail: {
//   trackingNo: '',
//   product: '',
//   sender: '',
//   recipient: '',
//   qty: 0,
//   address: '',
//   originCity: '',
//   originProvince: '',
//   originCountry: '',
//   originPostcode: '',
//   destinationCity: '',
//   destinationProvince: '',
//   destinationCountry: '',
//   destinationPostcode: '',
//   signer: 'พิสิษฐ์',
//   signerImageURL: '',
//   weight: 0,
//   shippingService: '',
//   returnShippingService: '',
//   deliveryType: '',
//   packaging: '',
//   senderPhoneNumber: '',
//   recipientPhoneNumber: '',
//   sendDate: '',
//   dueDate: '',
//   cashOnDelivery: '0',
//   isPayCashOnDelivery: false,
//   deliveryStaffName: '',
//   deliveryStaffPhoneNumber: '',
//   deliveryStaffBranchPhoneNumber: '',
//   senderCompany: '',
//   senderAddress: '',
//   recipientCompany: '',
//   recipientAddress: '',
//   courierPartnerTrackingNo: '',
//   courierPartner: '',
//   courierPartnerKey: '',
//   businessPartner: '',
//   deliveryTime: 1,
//   returnTrackingNo: '',
//   returnCourier: '',
//   returnCourierKey: '',
//   freight: '0',
//   payType: '',
//   priceMethod: ''
// },

// }

export default Tracking;
