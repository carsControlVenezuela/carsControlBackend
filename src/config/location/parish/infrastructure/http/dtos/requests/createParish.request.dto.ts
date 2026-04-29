import { IsString, IsNotEmpty, MinLength, MaxLength, IsUUID } from 'class-validator';
import { ParishRequestDto } from '../../../../application/dtos/requests/parish.request.dto';

export class CreateParishRequestDTO implements ParishRequestDto {
    
    @IsNotEmpty({message: 'El id del país es requerido'})
    @IsString({ message: 'El id del país debe ser una cadena de texto' })
    @IsUUID('4', { message: 'El id del país debe ser un UUID válido' })
    idMunicipality!: string;
    
    @IsNotEmpty({message: 'El nombre del estado es requerido'})
    @IsString({ message: 'El nombre del estado debe ser una cadena de texto' })
    @MinLength(2, { message: 'El nombre del estado debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del estado no puede exceder los 100 caracteres' })
    name!: string;
}