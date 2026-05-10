import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { UpdatePermissionInputDto } from '../../../../application/dtos/requests/updatePermission.requet.dto';

export class UpdatePermissionRequestDTO implements UpdatePermissionInputDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsOptional({message: 'El nombre es opcional'})
    @MinLength(2)
    name?: string;

    @IsString({ message: 'El recurso debe ser una cadena de texto' })
    @IsOptional({ message: 'EL recurso es opcional' })
    @MinLength(2, { message: 'El recurso del permiso debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El recurso del permiso no puede exceder los 30 caracteres' })
    resource?: string;

    @IsString({ message: 'La acción debe ser una cadena de texto' })
    @IsOptional({ message: 'La acción es opcional' })
    @MinLength(2, { message: 'La acción del permiso debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'La acción del permiso no puede exceder los 30 caracteres' })
    action?: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional({ message: 'La descripción es opcional' })
    @MinLength(2, { message: 'La descripción del permiso debe tener al menos 2 caracteres' })
    @MaxLength(50, { message: 'La descripción del permiso no puede exceder los 50 caracteres' })
    description?: string;

}