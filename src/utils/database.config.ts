import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { UserEntity } from "src/entities/user.entity";

export default (): TypeOrmModuleOptions => (
    {
        type: 'mysql',
        port: +process.env.DBPORT,
        host: process.env.DBHOST,
        username: process.env.DBUSERNAME,
        password: process.env.DBPASSWORD,
        database: process.env.DBNAME,
        synchronize : true,
        entities : [UserEntity]
    }
)