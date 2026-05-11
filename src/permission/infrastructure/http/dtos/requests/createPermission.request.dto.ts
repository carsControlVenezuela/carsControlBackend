import { IsString, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { CreatePermissionInputDto } from '../../../../application/dtos/requests/createPermission.requet.dto';

export class CreatePermissionRequestDTO implements CreatePermissionInputDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({message: 'El nombre del permiso es requerido'})
    @MinLength(2, { message: 'El nombre del permiso debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El nombre del permiso no puede exceder los 30 caracteres' })
    name!: string;

    @IsString({ message: 'El recurso debe ser una cadena de texto' })
    @IsNotEmpty({message: 'El recurso del permiso es requerido'})
    @MinLength(2, { message: 'El recurso del permiso debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El recurso del permiso no puede exceder los 30 caracteres' })
    resource!: string;

    @IsString({ message: 'La acción debe ser una cadena de texto' })
    @IsNotEmpty({message: 'La acción del permiso es requerida'})
    @MinLength(2, { message: 'La acción del permiso debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'La acción del permiso no puede exceder los 30 caracteres' })
    action!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({message: 'La descripción del permiso es requerida'})
    @MinLength(2, { message: 'La descripción del permiso debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'La descripción del permiso no puede exceder los 50 caracteres' })
    description!: string;

}