import { IsString, MinLength, MaxLength, IsUUID, IsOptional } from 'class-validator';
import { UpdateMunicipalityRequestDto } from '../../../../application/dtos/requests/updateMunicipality.request.dtos';

export class UpdateMunicipalityRequestDTO implements UpdateMunicipalityRequestDto {
    
    @IsString({ message: 'El id del país debe ser una cadena de texto' })
    @IsOptional({message: 'El id del país es opcional'})
    @IsUUID('4', { message: 'El id del país debe ser un UUID válido' })
    idState?: string;
    
    @IsString({ message: 'El nombre del país debe ser una cadena de texto' })
    @IsOptional({message: 'El nombre del país es opcional'})
    @MinLength(2, { message: 'El nombre del país debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre del país no puede exceder los 100 caracteres' })
    name?: string;
}