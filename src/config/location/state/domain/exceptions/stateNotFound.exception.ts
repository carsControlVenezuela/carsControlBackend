import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class StateNotFoundException extends AppException {
    constructor(value?: string) {
        const message = value 
            ? `Estado con el valor '${value}' no encontrado` 
            : 'Estado no encontrado: valor no proporcionado';
            
        super(message, HttpStatus.NOT_FOUND);
    }
}