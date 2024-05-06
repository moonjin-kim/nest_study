export class RegisterUserDto {
  email: string;
  password: string;
  nickname: string;

  constructor() {}

  static create(email: string, password: string, nickname: string) {
    const dto = new RegisterUserDto();
    dto.email = email;
    dto.password = password;
    dto.nickname = nickname;

    return dto;
  }
}
