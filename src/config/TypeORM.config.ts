import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { User } from "src/domain/user/user.entity";

export const typeORMConfig: TypeOrmModuleOptions = {
    type: "mysql",
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.APP_DATABASE,
    synchronize: process.env.DB_SYNCHRONIZE === 'true',
    logging: process.env.DB_LOGGING === 'true', 
    dropSchema: process.env.DB_DROP_SCHEMA === 'true',
    entities: [User],
};