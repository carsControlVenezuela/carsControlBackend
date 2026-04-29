import { HttpStatus } from "../../../../../core/domain/enums/httpStatus.enun";
import { AppException } from "../../../../../core/domain/exceptions/app.exception";

export class MunicipalityNotFoundException extends AppException {
    constructor(value?: string) {
        const message = value 
            ? `Municipio con el valor '${value}' no encontrado` 
            : 'Municipio no encontrado: valor no proporcionado';
            
        super(message, HttpStatus.NOT_FOUND);
    }
}