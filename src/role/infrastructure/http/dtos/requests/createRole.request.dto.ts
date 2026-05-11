import { IsArray, IsString, IsUUID, MinLength, ArrayNotEmpty, IsNotEmpty, MaxLength } from 'class-validator';
import { CreateRoleInputDto } from '../../../../application/dtos/requests/createRole.request.dto';

export class CreateRoleRequestDTO implements CreateRoleInputDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({message: 'El nombre del rol es requerido'})
    @MinLength(2, { message: 'El nombre del rol debe tener al menos 2 caracteres' })
    @MaxLength(30, { message: 'El nombre del rol no puede exceder los 30 caracteres' })
    name!: string;

    @IsString({ message: 'La descripción debe ser una cadena de texto' })
    @IsNotEmpty({message: 'La descripción del rol es requerida'})
    @MinLength(2, { message: 'La descripción del rol debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'La descripción del rol no puede exceder los 100 caracteres' })
    description!: string;

    @IsArray()
    @ArrayNotEmpty({ message: 'La lista de permisos no puede estar vacía'})
    @IsUUID('4', { each: true })
    permissionIds!: string[];

}