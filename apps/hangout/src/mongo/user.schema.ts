import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { Punishment } from '../dao/punishment';
import { UserStatus } from 'apps/auth/src/oauth/oauth.enum';
import { WithdrawalReason } from 'apps/hangout/enum/withdrawal-reason.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: { createdAt: true, updatedAt: true },
  versionKey: false,
})
export class User {
  @Prop()
  id: string;

  @Prop({ default: 'KR' })
  country: string;

  @Prop()
  phoneNumber?: string;

  @Prop()
  name?: string;

  @Prop({ default: false })
  active: boolean;

  @Prop({ enum: UserStatus, type: String })
  userStatus: UserStatus;

  @Prop()
  withdrawalExecutesAt?: Date;

  @Prop({ enum: WithdrawalReason, type: String })
  withdrawalReason?: WithdrawalReason;

  @Prop()
  punishmentExpiringAt?: Date;

  @Prop()
  punishment?: Punishment;

  @Prop({ default: 0 })
  groupNo: number;

  @Prop({ unique: true })
  referralCode: string;

  @Prop({ type: Date, default: Date.now })
  createdAt: Date;

  @Prop({ type: Date, default: Date.now })
  updatedAt: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);
UserSchema.index(
  { referralCode: 1 },
  {
    unique: true,
    partialFilterExpression: { referralCode: { $exists: true } },
  },
);
