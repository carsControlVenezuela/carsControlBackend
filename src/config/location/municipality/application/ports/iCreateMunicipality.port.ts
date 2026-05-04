import { MunicipalityRequestDto } from '../dtos/requests/municipality.request.dto';

export interface ICreateMunicipalityPort{
    execute(request: MunicipalityRequestDto):Promise<void>
}