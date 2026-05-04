import { IsString, IsNotEmpty, MinLength, MaxLength, IsUUID } from 'class-validator';
import { MunicipalityRequestDto } from '../../../../application/dtos/requests/municipality.request.dto';

export class CreateMunicipalityRequestDTO implements MunicipalityRequestDto {
    
    @IsNotEmpty({message: 'El id del país es requerido'})
    @IsString({ message: 'El id del país debe ser una cadena de texto' })
    @IsUUID('4', { message: 'El id del país debe ser un UUID válido' })
    idState!: string;
    
    @IsNotEmpty({message: 'El nombre del estado es requerido'})
    @IsString({ message: 'El nombre del estado debe ser una cadena de texto' })
    @MinLength(2, { message: 'El nombre del estado debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del estado no puede exceder los 100 caracteres' })
    name!: string;
}