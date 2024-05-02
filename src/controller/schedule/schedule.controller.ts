import { Controller, Post, Body, Param } from '@nestjs/common';
import { ScheduleService } from 'src/service/ schedule/schedule.service';
import { ScheduleCreateParam } from './dto/ScheduleCreateParam';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleSrvice: ScheduleService) {}

  @Post(':id')
  create(@Param('id') id: string, @Body() scheduleCreateDto: ScheduleCreateParam) {
    return this.scheduleSrvice.create(+id,scheduleCreateDto);
  }

}
