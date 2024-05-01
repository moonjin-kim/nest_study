import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';
import { Schedule } from '../ schedule/schedule.entity';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
    nullable: false,
  })
  password: string;

  @Column({
    type: "text",
    nullable: false,
  })
  salt: string;

  @Column({
    type: "text",
    nullable: false,
  })
  nickname: string;

  @OneToMany(() => Schedule, schedule => schedule.user, {lazy: true, cascade: true})
  schedules: Schedule[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(){}

  static signup(
    email: string,
    password: string,
    salt: string,
    nickname: string,
  ) {
    const user = new User;
    user.email = email;
    user.password = password;
    user.salt = salt;
    user.nickname = nickname;
    return user;
  }

  public changeInfo(
    nickname: string,
  ) {
    this.nickname = nickname;
  }

}