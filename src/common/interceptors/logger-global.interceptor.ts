import { CallHandler, ConsoleLogger, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { Observable, tap } from 'rxjs';
import { requestWithGuard } from '../../modules/auth/guards/auth.guard';

@Injectable()
export class LoggerGlobalInterceptor implements NestInterceptor {
    constructor(private logger: ConsoleLogger){}
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const contextHttp = context.switchToHttp();

        const request = contextHttp.getRequest<Request | requestWithGuard>();
        const response = contextHttp.getResponse<Response>();
    
        const { path, method } =  request;
        const { statusCode } = response;
        
    
        const preInstantController = Date.now();

        return next.handle().pipe(
            tap(()=> {
                this.logger.log(`${method} ${path}`);
                if('user' in request)
                    this.logger.log(`Route accessed by the user ${request.user.sub}`);
                const routeTimeExecute = Date.now() - preInstantController;
                this.logger.log(`Response: status ${statusCode} - ${routeTimeExecute}ms`);  
            })
        );
    }
}
