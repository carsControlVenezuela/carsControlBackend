import { IsArray, IsOptional, IsString, IsUUID, MaxLength, MinLength } from 'class-validator';
import { UpdateRoleInputDto } from '../../../../application/dtos/requests/updateRole.request.dto';

export class UpdateRoleRequestDTO implements UpdateRoleInputDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsOptional({message: 'El nombre es opcional'})
    @MinLength(2, { message: 'El nombre del rol debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El nombre del rol no puede exceder los 30 caracteres' })
    name?: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsOptional({message: 'La descripción es opcional'})
    @MinLength(2, { message: 'La descripción del rol debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'La descripción del rol no puede exceder los 100 caracteres' })
    description?: string;

    @IsOptional({ message: 'La lista de permisos es opcional'})
    @IsArray()
    @IsUUID('4', { each: true })
    permissionIds?: string[];

}