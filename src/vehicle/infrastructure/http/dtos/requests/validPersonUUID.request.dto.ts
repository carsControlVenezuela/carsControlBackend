import { IsUUID } from 'class-validator';

export class ValidPersonUUIDRequestDto {
  @IsUUID()
  idPerson!: string;
}
