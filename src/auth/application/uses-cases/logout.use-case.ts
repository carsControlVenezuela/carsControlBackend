import { IAuthRepository } from '../../domain/repositories/iAuth.repository';
import { jwtService } from '../../infrastructure/http/jwt/jwt.service';
import { ILogoutPort } from '../ports/logout.port';

export class LogoutUseCase implements ILogoutPort {
    constructor(private readonly authRepository: IAuthRepository) {}

    async execute(refreshToken: string): Promise<void> {
        jwtService.verifyRefreshToken(refreshToken); // valida que sea un token válido
        await this.authRepository.deleteRefreshToken(refreshToken);
    }
}