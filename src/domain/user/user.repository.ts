import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserRepository extends Repository<UserEntity>{
    
    async findByEmail(email: string) {
        return this.findOne({ where : { email } })
    }
}