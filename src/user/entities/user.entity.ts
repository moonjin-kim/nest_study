import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({type: "text"})
  password: string;

  @Column({type: "text"})
  salt: string;

  @Column()
  nickname: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date | null;

  constructor(){}

  static create(
    email: string,
    password: string,
    salt: string,
    nickname: string,
  ) {
    const user = new UserEntity;
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