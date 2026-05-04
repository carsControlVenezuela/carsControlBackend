import { RegisterInputDto } from "../dtos/requests/register.request.dto";
import { AuthResponseDto } from "../dtos/responses/auth.reponse.dto";

export interface IRegisterPort {
    execute(request: RegisterInputDto): Promise<AuthResponseDto>;
}