import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async Register(body: RegisterUserDto){
    const newuser = await this.userRepository.findOne({where:{email: body.email}});
    if(newuser){
        throw new UnauthorizedException('이미 존재하는 사용자입니다.')
        return;
    }else{
        await this.userRepository.save({
          email:body.email,
          password: body.password,
          age: body.age,
          nickname: body.nickname,
        })
    }     
}
  // create(createUserDto: CreateUserDto) {
  //   return 'This action adds a new user';
  // }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
