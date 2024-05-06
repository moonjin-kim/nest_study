import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Schedule } from './schedule.entity';

@Injectable()
export class ScheduleRepository extends Repository<Schedule> {}
