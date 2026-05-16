import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateModelRequestDto {
  @IsString()
  @IsNotEmpty()
  name!: string;
}
