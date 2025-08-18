
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';

const userFactory = () => {
  const schema = UserSchema;
  // Ensure password hash on save if changed
  schema.pre('save', async function(next) {
    const doc: any = this;
    if (doc.isModified('password')) {
      doc.password = await bcrypt.hash(doc.password, 10);
    }
    next();
  });
  return schema;
};

@Module({
  imports: [MongooseModule.forFeatureAsync([{
    name: User.name, useFactory: userFactory
  }])],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService, MongooseModule],
})
export class UsersModule {}
