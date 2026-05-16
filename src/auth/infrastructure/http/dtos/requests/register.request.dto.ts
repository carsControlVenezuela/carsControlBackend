import { IsDateString, IsEmail, IsIn, IsString, IsUUID, MinLength, MaxLength, IsOptional, IsNotEmpty } from 'class-validator';
import { RegisterInputDto } from '../../../../application/dtos/requests/register.request.dto';

export class RegisterRequestDTO implements RegisterInputDto {

    @IsNotEmpty({ message: 'El email es requerido' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email!: string;

    @IsNotEmpty({ message: 'La contraseña es requerida' })
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string;

    @IsNotEmpty({ message: 'El nombre es requerido' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @MinLength(2, { message: 'El nombre debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El nombre no puede exceder los 100 caracteres' })
    firstName!: string;

    @IsNotEmpty({ message: 'El apellido es requerido' })
    @IsString({ message: 'El apellido debe ser una cadena de texto' })
    @MinLength(2, { message: 'El apellido debe tener al menos 2 caracteres' })
    @MaxLength(100, { message: 'El apellido no puede exceder los 100 caracteres' })
    lastName!: string;

    @IsNotEmpty({ message: 'La cédula es requerida' })
    @IsString({ message: 'La cédula debe ser una cadena de texto' })
    @MinLength(1, { message: 'La cédula debe tener al menos 4 dígitos' })
    @MaxLength(8, { message: 'La cédula no puede exceder los 20 dígitos' })
    cedula!: string;

    @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
    @IsDateString({}, { message: 'La fecha de nacimiento debe ser una fecha válida' })
    birthday!: Date;

    @IsNotEmpty({ message: 'El género es requerido' })
    @IsIn(['Masculino', 'Femenino'], { message: 'El género debe ser Masculino o Femenino' })
    gender!: string;

    // @IsNotEmpty({message: 'El id de la zona postal es requerido'})
    // @IsUUID('4', { message: 'El id de la zona postal debe ser un UUID válido' })
    // idPostalZone!: string;

    @IsNotEmpty({ message: 'El rol es requerido' })
    @IsUUID('4', { message: 'El id del rol debe ser un UUID válido' })
    roleId!: string;

    @IsString()
    @IsOptional()
    middleName?: string;

    @IsString()
    @IsOptional()
    secondName?: string;
}