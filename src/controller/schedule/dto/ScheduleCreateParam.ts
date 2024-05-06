import { Schedule } from '../../../domain/schedule/schedule.entity';
import { User } from '../../../domain/user/user.entity';

export class ScheduleCreateParam {
  header: string;
  content: string;
  date: Date;
  startTime: string;
  endTime: string;

  constructor() {}

  static create(
    header: string,
    content: string,
    date: Date,
    startTime: string,
    endTime: string,
  ) {
    const dto = new ScheduleCreateParam();
    dto.header = header;
    dto.content = content;
    dto.date = date;
    dto.startTime = startTime;
    dto.endTime = endTime;
    return dto;
  }

  public toEntity(user: User) {
    return Schedule.create(
      this.header,
      this.content,
      this.date,
      this.startTime,
      this.endTime,
      user,
    );
  }
}
