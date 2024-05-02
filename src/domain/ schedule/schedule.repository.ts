import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleRepository extends Repository<Schedule>{
}