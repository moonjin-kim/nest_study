import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { RegisterUserDto } from './dto/signup.dto';
import { SignInDto } from './dto/signin.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() registerUserDto: RegisterUserDto) {
    return this.userService.Register(registerUserDto);
  }

  @Post('signin')
  signin(@Body() signinDto: SignInDto) {
    return this.userService.signin(signinDto);
  }

  @Get(':id')
  getUser(@Param('id') id: string,) {
    return this.userService.getUser(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.singOut(+id);
  }
}
