import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateBrandRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
