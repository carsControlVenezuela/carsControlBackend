import { LoginInputDto } from "../dtos/requests/login.request.dto";
import { AuthResponseDto } from "../dtos/responses/auth.reponse.dto";

export interface ILoginPort {
    execute(request: LoginInputDto): Promise<AuthResponseDto>;
}