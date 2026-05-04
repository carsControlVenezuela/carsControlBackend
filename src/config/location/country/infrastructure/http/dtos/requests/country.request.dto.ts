import { IsString, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { CountryRequestDto } from '../../../../application/dtos/request/country.request.dto';

export class CountryRequestDTO implements CountryRequestDto {
    
    @IsString({ message: 'El nombre del país debe ser una cadena de texto' })
    @IsNotEmpty({message: 'El nombre del país es requerido'})
    @MinLength(2, { message: 'El nombre del país debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del país no puede exceder los 100 caracteres' })
    name!: string;
}