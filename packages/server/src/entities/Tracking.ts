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
import { Timeline } from "./utils";

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
  trackingNo?: string;

  // whether it is found or not
  // not found means 1) wrong, or 2) not added into the system yet by courier
  @Field({ nullable: true })
  @Column({ nullable: true })
  isFound: boolean;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courier: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  courierKey: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  color: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  status: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  currentStatus: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  shareLink: string;

  @Field(() => [Timeline], { nullable: true })
  @Column("jsonb", { nullable: true, array: false }) // has to be set to false according to https://stackoverflow.com/questions/59437390/typeorm-jsonb-array-column
  timelines: Timeline[];

  @Field(() => [CartItem])
  @OneToMany(() => CartItem, (cartItems) => cartItems.tracking, {
    onDelete: "CASCADE",
  })
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
//   cashOnTheWay: string;
//   @Field()
//   isPayCashOnTheWay: boolean;
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
//   cashOnTheWay: '0',
//   isPayCashOnTheWay: false,
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
