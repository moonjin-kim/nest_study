import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterUserDto } from '../../controller/user/dto/signup.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import * as util from 'util';
import * as crypto from 'crypto';
import { SignInDto } from '../../controller/user/dto/signin.dto';
import { UpdateUserDto } from '../../controller/user/dto/update-user.dto';
import { UserItemDto } from './dto/user-item.dto';
import { User } from 'src/domain/user/user.entity';

const randomBytesPromise = util.promisify(crypto.randomBytes);
const pbkdf2Promise = util.promisify(crypto.pbkdf2);
const ENCRYPTED_COUNT = 221523;

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async Register(body: RegisterUserDto): Promise<String>{
    const newuser = await this.userRepository.findOneBy({ email : body.email });
    if(newuser){
      throw new UnauthorizedException('이미 존재하는 사용자입니다.');
    }

    const { hashedPassword, salt } = await this.createHashedPassword(body.password);

    await this.userRepository.save(
      User.signup(
        body.email,
        hashedPassword,
        salt,
        body.nickname,
      )
    )

    return '회원가입에 성공하였습니다.'
  
  }
  
  async signin(body: SignInDto) {
      const user = await this.userRepository.findOneBy({
          email: body.email
      })
      if(!user) {
          throw new UnauthorizedException("ID 혹은 PASSWORD가 잘못됐습니다.")
      }

      const checkPassword = await this.verifyPassword(
          body.password,
          user.salt,
          user.password,
      )

      if(!checkPassword) {
          throw new UnauthorizedException("ID 혹은 PASSWORD가 잘못됐습니다.")
      }

      //todo: token 적용(임시로 유저 아이디 전송)
      return user.id;
  }

  async getUser(id: number) {
    console.log(id);
    const user = await this.userRepository.findOneBy({id});
    if(!user){
      throw new UnauthorizedException('존재하지 않는 사용자입니다.');
    }

    return UserItemDto.create(user.email, user.nickname);
  }

  async update(id:number, body: UpdateUserDto) {
      const user = await this.userRepository.findOneBy({id});
      if(!user){
        throw new UnauthorizedException('존재하지 않는 사용자입니다.');
      }

      if(user.nickname === body.nickname) {
        throw new UnauthorizedException('현재 닉네임과 같습니다.');
      }

      user.changeInfo(body.nickname)
      this.userRepository.save(user);

      return "닉네임이 변경되었습니다."
  }

  singOut(id: number) {
      return `This action removes a #${id} user`;
  }


  //todo: password 매니저로 변경
  //비밀번호 Salt 생성
  private async createSalt() {
    //64바이트
    const buf = await randomBytesPromise(64);

    return buf.toString('base64');
  };

  private async createHashedPassword(password: string) {
    const salt = await this.createSalt();
    const key = await pbkdf2Promise(
        password,
        salt,
        ENCRYPTED_COUNT,
        64,
        'sha512',
    );
    const hashedPassword = key.toString('base64');
    return { hashedPassword, salt };
  };

  private async verifyPassword (
    password: string,
    userSalt: string,
    userPassword: string,
  ) {
    const key = await pbkdf2Promise(
        password,
        userSalt,
        ENCRYPTED_COUNT,
        64,
        'sha512',
    );
    const hashedPassword = key.toString('base64');

    if (hashedPassword === userPassword) return true;
    return false;
  };

}
