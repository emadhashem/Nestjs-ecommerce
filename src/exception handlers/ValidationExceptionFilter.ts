import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { ValidationError } from "class-validator";
import { Request, Response } from "express";

@Catch(ValidationError)

export class ValidationExceptionFilter implements ExceptionFilter {
    catch(exception: ValidationError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        const status = HttpStatus.BAD_REQUEST;
        response.status(status).json({
            statusCode: status,
            message: exception[0].constraints,
            error: 'Bad Request',
            path: request.url,
        });
    }
}