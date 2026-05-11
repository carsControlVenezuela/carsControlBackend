import { IsUUID } from 'class-validator';

export class ValidBrandUUIDRequestDto {
  @IsUUID()
  idBrand!: string;
}
