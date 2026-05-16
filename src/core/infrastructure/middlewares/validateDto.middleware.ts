import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';

export function validateDto(dtoClass: any) {

    return async (req: Request, res: Response, next: NextFunction) => {

        const dtoInstance = plainToInstance(dtoClass, req.body);

        // Opciones de validación
        const options: ValidatorOptions = {
            stopAtFirstError: true, //Detiene la validación en el primer fallo por campo
            validationError: { target: false, value: false } //Limpia el objeto de error
        };
        console.log(req.body)
        const errors = await validate(dtoInstance, options);

        if (errors.length > 0) {

            //Recorre cada campo para validar si hay un error y crear una estructura con el campo y el error que ocurrió
            const formattedErrors = errors.map((err: ValidationError) => ({
                field: err.property,
                message: Object.values(err.constraints || {})[0]
            }));
            return res.status(400).json({ errors: formattedErrors });
        }

        req.body = dtoInstance;
        next();
    };
}