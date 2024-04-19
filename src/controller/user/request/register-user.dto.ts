export class RegisterUserDto {
    id: string;
    password: string;
    salt: string;
    name: string;

    constructor() {};

    static create(
        id: string,
        password: string,
        salt: string,
        name: string,
    ) {
        const dto = new RegisterUserDto();
        dto.id = id;
        dto.password = password;
        dto.salt = salt;
        dto.name = name;
        return dto;
    }
}