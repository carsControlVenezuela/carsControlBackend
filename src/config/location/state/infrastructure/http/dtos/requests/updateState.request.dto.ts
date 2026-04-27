import { IsString, MinLength, MaxLength, IsUUID, IsOptional } from 'class-validator';
import { UpdateStateRequestDto } from '../../../../application/dtos/requests/updateState.request.dto';

export class UpdateStateRequestDTO implements UpdateStateRequestDto {
    
    @IsString({ message: 'El id del país debe ser una cadena de texto' })
    @IsOptional({message: 'El id del país es opcional'})
    @IsUUID('4', { message: 'El id del país debe ser un UUID válido' })
    idCountry?: string;
    
    @IsString({ message: 'El nombre del país debe ser una cadena de texto' })
    @IsOptional({message: 'El nombre del país es opcional'})
    @MinLength(2, { message: 'El nombre del país debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del país no puede exceder los 100 caracteres' })
    name?: string;
}