import * as bcrypt from 'bcrypt';

import { Exclude, Expose } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { AuthType, OAuthProvider, UserStatus } from '../oauth/oauth.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({
  timestamps: { createdAt: true, updatedAt: true },
  versionKey: false,
})
export class User {
  @Expose()
  id: string;

  @Prop({ enum: UserStatus, type: String })
  @Expose()
  userStatus: UserStatus;

  @Prop({ enum: AuthType, type: String })
  @Expose()
  authType: AuthType;

  @Prop({ enum: OAuthProvider, type: String })
  @Expose()
  provider: OAuthProvider;

  @Prop({ unique: true })
  @Exclude({ toPlainOnly: true })
  userId?: string;

  @Prop()
  @Expose()
  email?: string;

  @Prop()
  @Exclude({ toPlainOnly: true })
  password?: string; // 이메일 인증을 통해 가입한 경우에만 존재

  @Prop()
  @Exclude()
  currentRefreshToken?: string;

  @Prop()
  @Exclude()
  currentRefreshTokenExp?: Date;

  @Prop()
  @Expose()
  createdAt?: Date;

  @Prop()
  @Expose()
  updatedAt?: Date;
}

const schema = SchemaFactory.createForClass(User);
schema.index({ provider: 1, userId: 1 }, { unique: true });

// save 이벤트가 발생하기 전에 실행
schema.pre<UserDocument>('save', async function (next) {
  if (this.authType == AuthType.EMAIL_PASSWORD && this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

export const UserSchema = schema;
