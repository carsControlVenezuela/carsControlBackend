import { IsEmail, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';
import { CreateVehicleRepairInputDto } from '../../../../application/dtos/requests/createVehicleRepair.request.dto';

export class CreateVehicleRepairRequestDTO implements CreateVehicleRepairInputDto {

    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    @IsNotEmpty({message: 'El nombre del nombre es requerido'})
    @MinLength(2, { message: 'El nombre del nombre debe tener al menos 2 caracteres' })
    @MaxLength(200, { message: 'El nombre del nombre no puede exceder los 200 caracteres' })
    name!: string;

    @IsString({ message: 'La ubicación debe ser una cadena de texto' })
    @IsNotEmpty({message: 'La ubicación es requerida'})
    @MinLength(2, { message: 'La ubicación debe tener al menos 2 caracteres' })
    @MaxLength(300, { message: 'La ubicación no puede exceder los 300 caracteres' })
    location!: string;

    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    @IsOptional({ message: 'El teléfono es opcional' })
    @MinLength(10, { message: 'El teléfono debe tener al menos 10 caracteres' })
    @MaxLength(14, { message: 'El teléfono no puede exceder los 14 caracteres' })
    phone!: string;

    @IsString({ message: 'El correo electrónico debe ser una cadena de texto' })
    @IsOptional({ message: 'El correo electrónico es opcional' })
    @IsEmail({}, { message: 'El email debe ser válido' })
    email?: string;

    @IsString({ message: 'La foto debe ser una cadena de texto' })
    @IsOptional({message: 'La foto es opcional'})  
    photo?: string;
}