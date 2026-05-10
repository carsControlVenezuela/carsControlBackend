import { IsString, IsNotEmpty, IsUUID } from 'class-validator';
import { ModelRequestDto } from '../../../application/dtos/requests/model.request.dto';

export class CreateModelRequestDto implements ModelRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsUUID()
  @IsNotEmpty()
  idBrand!: string;
}