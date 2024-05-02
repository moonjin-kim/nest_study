import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from '../controller/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
