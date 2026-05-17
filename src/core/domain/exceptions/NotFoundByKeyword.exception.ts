import { HttpStatus } from "../enums/httpStatus.enun";
import { AppException } from "./app.exception";

export class NotFoundByKeywordException extends AppException {
    constructor(resourseName: string) {
        super(`No hay coincidencia la busqueda de ${resourseName}`, HttpStatus.NOT_FOUND);
    }
}