export class UserItemDto {
  email: string;
  nickname: string;

  constructor() {}

  static create(email: string, nickname: string) {
    const dto = new UserItemDto();
    dto.email = email;
    dto.nickname = nickname;

    return dto;
  }
}
