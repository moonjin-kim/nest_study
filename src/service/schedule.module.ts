import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Schedule } from 'src/domain/schedule/schedule.entity';
import { ScheduleService } from './schedule/schedule.service';
import { ScheduleController } from 'src/controller/schedule/schedule.controller';
import { User } from 'src/domain/user/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Schedule]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [ScheduleController],
  providers: [ScheduleService],
})
export class ScheduleModule {}
