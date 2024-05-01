import { Module } from '@nestjs/common';
import { UserService } from './user/user.service';
import { UserController } from '../controller/user/user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../domain/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
