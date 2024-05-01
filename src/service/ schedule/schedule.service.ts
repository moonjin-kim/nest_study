import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule } from 'src/domain/ schedule/schedule.entity';
import { User } from 'src/domain/user/user.entity';
import { ScheduleCreateParam } from 'src/controller/schedule/dto/ScheduleCreateParam';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
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
}
