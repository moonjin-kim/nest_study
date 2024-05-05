import { Injectable, Logger, NotFoundException, ServiceUnavailableException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { Schedule } from '../../domain/schedule/schedule.entity';
import { User } from '../../domain/user/user.entity';
import { ScheduleCreateParam } from '../../controller/schedule/dto/ScheduleCreateParam';
import { ScheduleUpdateParam } from '../../controller/schedule/dto/ScheduleUpdateParam';
import { ScheduleItemDto } from './dto/ScheduleItem.dto';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Schedule)
    private scheduleRepository: Repository<Schedule>,
  ) {}

  async create(userId: number, now: Date, dto: ScheduleCreateParam) {
    const combinedEndTime = addDateTime(dto.date, dto.endTime);
    if(now > combinedEndTime) {
      throw new Error('일정을 생성할 수 없는 시간입니다.');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('회원을 찾을 수 없습니다');
    }

    const schedule = await this.scheduleRepository.save(dto.toEntity(user));

    return Number(schedule.id);
  }

  async update(scheduleId: number, userId: number, now: Date, dto: ScheduleUpdateParam) {
    const combinedEndTime = addDateTime(dto.date, dto.endTime);
    if(now > combinedEndTime) {
      throw new Error('일정을 수정 할 수 없는 시간입니다.');
    }

    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('회원을 찾을 수 없습니다');
    }

    const schedule = await this.scheduleRepository.findOneBy({
      id: scheduleId,
    });
    schedule.header = dto.header;
    schedule.content = dto.content;
    schedule.date = dto.date;
    schedule.startTime = dto.startTime;
    schedule.endTime = dto.endTime;
    await this.scheduleRepository.save(schedule);

    return Number(schedule.id);
  }

  async get(
    userId: number,
    year: number,
    month: number,
  ): Promise<ScheduleItemDto[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('회원을 찾을 수 없습니다');
    }

    const startDayOfMay = new Date(year, month - 1, 1);
    const endDayOfMay = new Date(year, month, 1);

    const schdules = await this.scheduleRepository.find({
      where: {
        userId: user.id,
        date: Between(startDayOfMay, endDayOfMay),
      },
    });

    return schdules.map((schdule) => {
      return ScheduleItemDto.toDto(
        schdule.header,
        schdule.content,
        schdule.date,
        schdule.startTime,
        schdule.endTime,
      );
    });
  }

  async delete(userId: number, schduleId: number) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new NotFoundException('회원을 찾을 수 없습니다');
    }

    const schdule = await this.scheduleRepository.findOneBy({
      id: schduleId,
    });
    if (!schdule) {
      throw new NotFoundException('존재하지 않는 일정입니다.');
    }

    if (schdule.userId == userId) {
      throw new NotFoundException('삭제 권한이 없습니다.');
    }

    await this.scheduleRepository.softDelete({
      id: schduleId,
    });
    Logger.log(`[Schedule] ${schduleId}는 삭제되었습니다`);

    return '삭제되었습니다.';
  }
}

function addDateTime(date: Date, timeString : string) {
  const timeParts = timeString.split(":");
  const hours = parseInt(timeParts[0]); // 시간을 정수형으로 변환합니다.
  const minutes = parseInt(timeParts[1]); // 분을 정수형으로 변환합니다.

  const currentDate = date; // 현재 날짜와 시간을 가져옵니다.
  currentDate.setHours(hours); // 시간을 설정합니다.
  currentDate.setMinutes(minutes); // 분을 설정합니다.

  return currentDate;
}