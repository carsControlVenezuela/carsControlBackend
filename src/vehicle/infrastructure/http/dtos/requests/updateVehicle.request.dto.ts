import { IsString, IsOptional, IsNumber, Min } from 'class-validator';

export class UpdateVehicleRequestDto {
  @IsString()
  @IsOptional()
  color?: string;

  @IsString()
  @IsOptional()
  plate?: string;

  @IsNumber()
  @Min(0)
  @IsOptional()
  mileage?: number;
}
