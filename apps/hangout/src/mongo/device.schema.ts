import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { HydratedDocument } from 'mongoose';
import { Language } from '../preference/language';

export type DeviceDocument = HydratedDocument<Device>;

@Schema({
  timestamps: { createdAt: true, updatedAt: true },
  versionKey: false,
})
export class Device {
  @Prop()
  userId: string;

  @Prop({ unique: true })
  deviceId: string;

  @Prop()
  fcmToken: string;

  @Prop()
  name: string;

  @Prop()
  system: string;

  @Prop()
  systemVersion: string;

  @Prop({ default: false })
  isVirtual: boolean;

  @Prop()
  lastConnectedAt: Date;

  @Prop({ enum: Language, type: String, default: Language.defaultLanguage })
  language: Language;

  @Prop({ default: Date.now })
  createdAt: Date;
}

const schema = SchemaFactory.createForClass(Device);
schema.index({ userId: 1, deviceId: 1 }, { unique: true });
schema.index({ deviceId: 1, lastConnectedAt: -1 });
schema.index(
  { fcmToken: 1 },
  { partialFilterExpression: { fcmToken: { $exists: true } } },
);

export const DeviceSchema = schema;
