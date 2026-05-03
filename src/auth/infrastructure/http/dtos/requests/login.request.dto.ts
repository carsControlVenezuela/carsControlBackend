import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';
import { LoginInputDto } from '../../../../application/dtos/requests/login.request.dto';

export class LoginRequestDTO implements LoginInputDto {

    @IsNotEmpty({message: 'El email es requerido'})
    @IsEmail({}, { message: 'El email debe ser válido' })
    email!: string;

    @IsNotEmpty({message: 'La contraseña es requerida'})
    @IsString({ message: 'La contraseña debe ser una cadena de texto' })
    @MinLength(6, { message: 'La contraseña debe tener al menos 6 caracteres' })
    password!: string;
}