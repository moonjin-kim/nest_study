export class UpdateUserDto {
  nickname: string;

  constructor() {}

  static create(nickname: string) {
    const dto = new UpdateUserDto();
    dto.nickname = nickname;
    return dto;
  }
}
