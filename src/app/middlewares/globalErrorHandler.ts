import { Prisma } from "@prisma/client";
import { NextFunction, Request, Response } from "express"
import httpStatus from "http-status"

const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let statusCode : number = httpStatus.INTERNAL_SERVER_ERROR;
    let success = false;
    let message = err.message || "Something went wrong!";
    let error = err;

    if(err instanceof Prisma.PrismaClientKnownRequestError) {
        if(err.code === 'P2002') { 
            message = `Unique constraint failed on the fields: ${err.meta?.target}`;
            error =  err.meta;
            statusCode = httpStatus.BAD_REQUEST;
        }
        if(err.code === 'P2025') {
            message = `An operation failed because it depends on one or more records that were required but not found.`;
            error =  err.meta;
            statusCode = httpStatus.NOT_FOUND;
        }
        if(err.code === 'P2003') {
            message = `Foreign key constraint failed on the field: ${err.meta?.field_name}`;
            error =  err.meta;
            statusCode = httpStatus.BAD_REQUEST;
        }
    }
   else if(err instanceof Prisma.PrismaClientValidationError) {
        message = "validation error occurred";
        error =  err.message;
        statusCode = httpStatus.BAD_REQUEST;
    }
    else if(err instanceof Prisma.PrismaClientUnknownRequestError) {
        message = "Unknown error occurred";
        error =  err.message;
        statusCode = httpStatus.BAD_REQUEST;
    }
    else if(err instanceof Prisma.PrismaClientInitializationError) {
        message = "Prisma initialization error occurred";
        error =  err.message;
        statusCode = httpStatus.BAD_REQUEST;
    }
    else if(err instanceof Prisma.PrismaClientRustPanicError) {
        message = "Prisma rust panic error occurred";
        error =  err.message;
        statusCode = httpStatus.BAD_REQUEST;
    }
    res.status(statusCode).json({
        success,
        message,
        error
    })
};

export default globalErrorHandler;