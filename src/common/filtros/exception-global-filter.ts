import { ArgumentsHost, Catch, ConsoleLogger, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

@Catch()
export class ExceptionGlobalFilter implements ExceptionFilter{
    constructor(
        private adapterHost: HttpAdapterHost,
        private logger: ConsoleLogger
    ){}

    catch(exception: unknown, host: ArgumentsHost) {
        
        const { httpAdapter } = this.adapterHost;
        const context = host.switchToHttp();
        const response = context.getResponse();
        const request = context.getRequest();
        const { path, method } =  request;
        
        this.logger.error(`${method} ${path}`);
        this.logger.error(exception);

        if('user' in request)
            this.logger.log(`Route accessed by the user ${request.user.sub}`);

        const { status, body } = exception instanceof HttpException 
            ?{
                status: exception.getStatus(),
                body: exception.getResponse()
            }
            :{
                status: HttpStatus.INTERNAL_SERVER_ERROR,
                body: {
                    statuscode: HttpStatus.INTERNAL_SERVER_ERROR,
                    timesTamp: new Date().toString(),
                    path: httpAdapter.getRequestUrl(request),
                }
            };

        httpAdapter.reply(response, body, status);
    }

}
