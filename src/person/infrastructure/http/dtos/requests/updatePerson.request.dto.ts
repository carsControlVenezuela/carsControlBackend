import { IsString, MinLength, MaxLength, IsUUID, IsOptional, IsDateString, IsIn } from 'class-validator';
import { UpdatePersonRequestDto } from '../../../../application/dtos/requests/updatePerson.request.dto';

export class UpdatePersonRequestDTO implements UpdatePersonRequestDto {

    @IsString({ message: 'La cédula debe ser una cadena de texto' })
    @IsOptional({message: 'La cédula es opcional'})
    @MinLength(1, { message: 'La cédula debe tener al menos 2 caracteres' })
    @MaxLength(8, {message: 'La cédula no puede exceder los 9 caracteres'})
    cedula?: string;
    
    @IsString({ message: 'El primer nombre debe ser una cadena de texto' })
    @IsOptional({message: 'El primer nombre es opcional'})
    @MinLength(3, { message: 'El primer nombre debe tener al menos 3 caracteres' })
    @MaxLength(20, {message: 'El primer nombre no puede exceder los 20 caracteres'})
    firstName?: string;

    @IsString({ message: 'El primer apellido debe ser una cadena de texto' })
    @IsOptional({message: 'El primer apellido es opcional'})
    @MinLength(3, { message: 'El primer apellido debe tener al menos 3 caracteres' })
    @MaxLength(20, {message: 'El primer apellido no puede exceder los 20 caracteres'})
    lastName?: string;

    @IsOptional({ message: 'La fecha de nacimiento es opcional' })
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
    birthday?: Date;

    @IsOptional({ message: 'El género es opcional' })
    @IsIn(['Masculino', 'Femenino'], { message: 'El género debe ser Masculino o Femenino' })
    gender?: string;

    @IsString({ message: 'El avatar debe ser una cadena de texto' })
    @IsOptional({message: 'El avatar es opcional'})  
    avatar?: string;

    // @IsOptional({message: 'El id de la zona postal es opcional'})
    // @IsUUID('4', { message: 'El id de la zona postal debe ser un UUID válido' })
    // idPostalZone!: string;

    @IsString({ message: 'El segundo nombre debe ser una cadena de texto' })
    @IsOptional({message: 'El segundo nombre es opcional'})
    @MinLength(3, { message: 'El segundo nombre debe tener al menos 3 caracteres' })
    @MaxLength(20, {message: 'El segundo nombre no puede exceder los 20 caracteres'})
    middleName?: string;

    @IsString({ message: 'El segundo apellido debe ser una cadena de texto' })
    @IsOptional({message: 'El segundo apellido es opcional'})
    @MinLength(3, { message: 'El segundo apellido debe tener al menos 3 caracteres' })
    @MaxLength(20, {message: 'El segundo apellido no puede exceder los 20 caracteres'})
    secondName?: string;
}