import { PartialType } from '@nestjs/mapped-types';
// import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto{
    nickname: string;

    constructor(){}

    static create(
        nickname: string,
    ) {
        const dto = new UpdateUserDto();
        dto.nickname = nickname;
        return dto;
    }
}
