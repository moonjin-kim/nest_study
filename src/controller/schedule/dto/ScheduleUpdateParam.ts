export class ScheduleUpdateParam {
  header: string;
  content: string;
  date: Date;
  startTime: string;
  endTime: string;

  constructor() {}

  static update(
    header: string,
    content: string,
    date: Date,
    startTime: string,
    endTime: string,
  ) {
    const dto = new ScheduleUpdateParam();
    dto.header = header;
    dto.content = content;
    dto.date = date;
    dto.startTime = startTime;
    dto.endTime = endTime;
    return dto;
  }
}
