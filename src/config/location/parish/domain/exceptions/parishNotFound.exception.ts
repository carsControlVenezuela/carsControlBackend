import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class ParishNotFoundException extends AppException {
    constructor(value?: string) {
        const message = value 
            ? `Parroquia con el valor '${value}' no encontrado` 
            : 'Parroquia no encontrado: valor no proporcionado';
            
        super(message, HttpStatus.NOT_FOUND);
    }
}