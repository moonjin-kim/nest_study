import {
  Controller,
  Post,
  Body,
  Param,
  Put,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { ScheduleCreateParam } from './dto/ScheduleCreateParam';
import { ScheduleUpdateParam } from './dto/ScheduleUpdateParam';
import { ScheduleGetQuery } from './dto/ScheduleGetQuery';
import { ScheduleService } from '../../service/schedule/schedule.service';

@Controller('schedule')
export class ScheduleController {
  constructor(private readonly scheduleSrvice: ScheduleService) {}

  //jwt 적용후 id 제거
  @Post(':id')
  create(
    @Param('id') id: string,
    @Body() scheduleCreateDto: ScheduleCreateParam,
  ) {
    return this.scheduleSrvice.create(+id, new Date(), scheduleCreateDto);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() scheduleUpdateDot: ScheduleUpdateParam,
  ) {
    return this.scheduleSrvice.update(+id, 1, new Date(), scheduleUpdateDot);
  }

  @Get(':id')
  get(@Param('id') id: string, @Query() query: ScheduleGetQuery) {
    return this.scheduleSrvice.get(+id, query.year, query.month);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.scheduleSrvice.delete(+id, 1);
  }
}
