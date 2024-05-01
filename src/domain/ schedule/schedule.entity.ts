import {
    Column,
    DeleteDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../user/user.entity';

@Entity({ name: 'schedule' })
export class Schedule {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        nullable: false,
        unique: true,
    })
    header: string;

    @Column({
        type: "text",
        nullable: false,
    })
    content: string;

    @Column({
        type: "timestamptz",
        nullable: false,
    })
    date: Date;

    @Column({
        type: "time",
        nullable: false,
    })
    startTime: string;

    @Column({
        type: "time",
        nullable: false,
    })
    endTime: string;

    @Column({
        nullable: false,
        unique: true,
    })
    userId: number;

    @ManyToOne(() => User, user => user.schedules)
    user: User;

    @DeleteDateColumn()
    deletedAt: Date | null;

    constructor(){}

    static create(
        header: string,
        content: string,
        date: Date,
        startTime: string,
        endTime: string,
        user: User,
    ) {
        const schedule = new Schedule();
        schedule.header = header;
        schedule.content = content;
        schedule.date = date;
        schedule.startTime = startTime;
        schedule.endTime = endTime;
        schedule.user = user;
        return schedule;
    }

    update(
        header: string,
        content: string,
        date: Date,
        startTime: string,
        endTime: string,
    ) {
        this.header = header;
        this.content = content;
        this.date = date;
        this.startTime = startTime;
        this.endTime = endTime;
    }

}