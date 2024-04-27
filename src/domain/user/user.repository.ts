import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { DataSource, Repository } from 'typeorm';
import { UserEntity } from './user.domain';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private dataSource: DataSource) {
    super(UserEntity, dataSource.createEntityManager());
  }

}