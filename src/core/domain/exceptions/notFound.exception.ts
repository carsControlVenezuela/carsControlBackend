import { HttpStatus } from "../enums/httpStatus.enun";
import { AppException } from "./app.exception";

export class NotFoundException extends AppException {
    constructor(resourseName: string, value: string) {
        super(`No se encuentra el valor ${value} del ${resourseName}`, HttpStatus.NOT_FOUND);
    }
}