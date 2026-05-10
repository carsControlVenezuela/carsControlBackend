import { IsString, IsOptional, IsNotEmpty } from 'class-validator';

export class UpdateModelRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
