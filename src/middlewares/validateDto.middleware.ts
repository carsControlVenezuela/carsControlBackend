import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dtoClass: any) {
    return async (req: Request, res: Response, next: NextFunction) => {
        const dtoInstance = plainToInstance(dtoClass, req.body);
        const errors = await validate(dtoInstance);

        if (errors.length > 0) {
            const messages = errors.map(e => 
                Object.values(e.constraints || {}).join(', ')
            );
            res.status(400).json({ errors: messages });
            return;
        }

        req.body = dtoInstance;
        next();
    };
}