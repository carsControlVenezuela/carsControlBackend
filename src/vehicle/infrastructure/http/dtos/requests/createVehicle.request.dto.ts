import { IsString, IsNotEmpty, IsUUID, IsDateString, IsNumber, Min } from 'class-validator';
import { VehicleRequestDto } from '../../../../application/dtos/requests/vehicle.request.dto';

export class CreateVehicleRequestDto implements VehicleRequestDto {
  @IsUUID()
  @IsNotEmpty()
  idPerson!: string;

  @IsUUID()
  @IsNotEmpty()
  idModel!: string;

  @IsDateString()
  @IsNotEmpty()
  year!: string;

  @IsString()
  @IsNotEmpty()
  color!: string;

  @IsDateString()
  @IsNotEmpty()
  purchaseDate!: string;

  @IsString()
  @IsNotEmpty()
  plate!: string;

  @IsNumber()
  @Min(0)
  mileage!: number;
}
