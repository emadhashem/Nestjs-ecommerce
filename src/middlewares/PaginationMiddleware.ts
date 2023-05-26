import { BadRequestException, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";

export class PaginationMiddleware implements NestMiddleware {


    use(req: Request, res: Response, next: NextFunction) {

        let {page , size} = req.query
        if(!page || !size) throw new BadRequestException('Please add size and limit for cur page.')
        const pageNumber = Number(page) || 1;
        const skip = (pageNumber - 1) * Number(size)
        const limit = Number(size)

        req['pagination'] = {
            skip , limit
        }
        next();
    }

}