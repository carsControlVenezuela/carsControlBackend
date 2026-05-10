import { IsString, IsNotEmpty } from 'class-validator';
import { BrandRequestDto } from '../../../../application/dtos/requests/brand.request.dto';

export class CreateBrandRequestDto implements BrandRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
