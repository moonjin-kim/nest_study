export class ScheduleItemDto {
  header: string;
  content: string;
  date: Date;
  startTime: string;
  endTime: string;

  constructor() {}

  static toDto(
    header: string,
    content: string,
    date: Date,
    startTime: string,
    endTime: string,
  ) {
    const dto = new ScheduleItemDto();
    dto.header = header;
    dto.content = content;
    dto.date = date;
    dto.startTime = startTime;
    dto.endTime = endTime;

    return dto;
  }
}
