import { Global, Module } from '@nestjs/common';
import { User, UserSchema } from './user.schema';

import { MongooseModule } from '@nestjs/mongoose';
import { UserRepository } from './user.repository';

@Global()
@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
