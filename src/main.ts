import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import helmet from 'helmet';
import * as csurf from 'csurf';
import * as rateLimit from 'express-rate-limit';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    
    const limiter = rateLimit.rateLimit({
        windowMs: 15 * 60 * 1000,
        max: 100, 
        message: 'Você atingiu o limite de requisições. Tente novamente mais tarde.',
    });
    app.use(limiter);

    app.enableCors({
        origin: (origin, callback) => {
            if (!origin || !origin.startsWith('http://localhost')) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
    });
    app.use(helmet());
    app.use(cookieParser());
    app.use(csurf({ cookie: { sameSite: true } }));

    app.use((req: any, res: any, next: any) => {
        const token = req.csrfToken();
        res.cookie('XSRF-TOKEN', token);
        res.locals.csrfToken = token;

        next();
    });
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
        
    useContainer(app.select(AppModule), { fallbackOnErrors: true });
    
    await app.listen(3000);
}
bootstrap();
