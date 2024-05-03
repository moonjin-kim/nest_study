import { Injectable, Logger, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Schedule } from 'src/domain/ schedule/schedule.entity';
import { User } from 'src/domain/user/user.entity';
import { ScheduleCreateParam } from 'src/controller/schedule/dto/ScheduleCreateParam';
import { ScheduleUpdateParam } from 'src/controller/schedule/dto/ScheduleUpdateParam';
import { ScheduleItemDto } from './dto/ScheduleItem.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(
    userId: number,
    dto: ScheduleCreateParam,
  ) {
      const user = await this.userRepository.findOneBy({id: userId});
      if(!user) {
          throw new NotFoundException('회원을 찾을 수 없습니다');
      }

      const schedule = await this.scheduleRepository.save(dto.toEntity(user));

      return Number(schedule.id);
  }

  async update(
    scheduleId: number,
    userId: number,
    dto: ScheduleUpdateParam,
  ) {
      const user = await this.userRepository.findOneBy({id: userId});
      if(!user) {
          throw new NotFoundException('회원을 찾을 수 없습니다');
      }

      const schedule = await this.scheduleRepository.findOneBy({
        id: scheduleId,
      })
      schedule.update(
        dto.header,
        dto.content,
        dto.date,
        dto.startTime,
        dto.endTime
      )
      await this.scheduleRepository.save(schedule);

      return Number(schedule.id);
  }

  async get(
    userId: number,
    year: number,
    month: number,
  ): Promise<ScheduleItemDto[]>{
      const user = await this.userRepository.findOneBy({id: userId});
      if(!user) {
          throw new NotFoundException('회원을 찾을 수 없습니다');
      }

      const startDayOfMay = new Date(year, month-1, 1);
      const endDayOfMay = new Date(year, month, 1);

      const schdules = await this.scheduleRepository.find({
        where : {
          userId: user.id,
          date: Between(startDayOfMay, endDayOfMay)
        }
      });

      return schdules.map((schdule) => {
        return ScheduleItemDto.toDto(
          schdule.header,
          schdule.content,
          schdule.date,
          schdule.startTime,
          schdule.endTime,
        )
      });
  }

  async delete(userId: number, schduleId: number) {
    const user = await this.userRepository.findOneBy({id: userId});
    if(!user) {
        throw new NotFoundException('회원을 찾을 수 없습니다');
    }

    const schdule = await this.scheduleRepository.findOneBy({
      id: schduleId
    });
    if(!schdule) {
      throw new NotFoundException('존재하지 않는 일정입니다.');
    }
    
    if(schdule.userId == userId) {
      throw new NotFoundException('삭제 권한이 없습니다.');
    }

    await this.scheduleRepository.softDelete({
      id: schduleId
    });
    Logger.log(`[Schedule] ${schduleId}는 삭제되었습니다`)

    return "삭제되었습니다."
  }
}
