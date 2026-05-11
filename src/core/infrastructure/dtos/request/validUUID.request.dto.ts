import { IsUUID } from 'class-validator';

export class ValidUUIDRequestDto {
  @IsUUID()
  id!: string;
}
