import { AuthResponseDto } from "../dtos/responses/auth.reponse.dto";

export interface IRefreshTokenPort {
    execute(refreshToken: string): Promise<AuthResponseDto>;
}