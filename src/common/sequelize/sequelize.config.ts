// sequelize.config.ts
import { SequelizeModuleOptions } from '@nestjs/sequelize';
import 'dotenv/config';

export const sequelizeConfig: SequelizeModuleOptions = {
    
    dialect: 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    autoLoadModels: true,
    synchronize: true, // Somente para ambiente de desenvolvimento
    pool: {
        max: 10,
        min: 0,
        acquire: 120000, 
        idle: 3000,
    },
};

