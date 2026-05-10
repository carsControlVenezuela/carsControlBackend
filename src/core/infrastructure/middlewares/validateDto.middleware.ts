import { plainToInstance } from 'class-transformer';
import { validate, ValidationError, ValidatorOptions } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { HttpStatus } from '../../domain/enums/httpStatus.enun';

export function validateDto(dtoClass: any, element: 'body' | 'params' | 'query' = 'body') {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoInstance = plainToInstance(dtoClass, req[element]);

    // Opciones de validación
    const options: ValidatorOptions = {
      stopAtFirstError: true, //Detiene la validación en el primer fallo por campo
      validationError: { target: false, value: false }, //Limpia el objeto de error
    };

    const errors = await validate(dtoInstance, options);

    if (errors.length > 0) {
      //Recorre cada campo para validar si hay un error y crear una estructura con el campo y el error que ocurrió
      const formattedErrors = errors.map((err: ValidationError) => ({
        field: err.property,
        message: Object.values(err.constraints || {})[0],
      }));
      return res.status(HttpStatus.BAD_REQUEST).json({ errors: formattedErrors });
    }

    if (element === 'body') {
      req.body = dtoInstance;
    }
    next();
  };
}
