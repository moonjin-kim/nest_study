import { Body, Controller, Get, Post } from "@nestjs/common";
import { RegisterUserDto } from "./request/register-user.dto";

// @Controller('user')
// export class UserController {
//     @Post('')
//     register(@Body() registerUserDto: RegisterUserDto) {
//         return '회원가입 되었습니다.'
//     }

//     @Get('')
//     find() {
//         return RegisterUserDto.create(
//             'test@test.com',
//             'testpassword123',
//             'test-key',
//             '김문진',
//         );
//     }

// }