import { IUserRepository } from "../../../user/domain/repositories/iUser.repository";
import { InvalidTokenException } from "../../domain/exceptions/invalidToken.exception";
import { IAuthRepository } from "../../domain/repositories/iAuth.repository";
import { jwtService } from "../../infrastructure/http/jwt/jwt.service";
import { AuthResponseDto } from "../dtos/responses/auth.reponse.dto";
import { IRefreshTokenPort } from "../ports/refreshToken.port";

export class RefreshTokenUseCase implements IRefreshTokenPort {
    constructor(
        private readonly authRepository: IAuthRepository,
        private readonly userRepository: IUserRepository
    ) {}

    async execute(refreshToken: string): Promise<AuthResponseDto> {

        //Verifica firma del token
        jwtService.verifyRefreshToken(refreshToken);

        //Verifica que el token existe en DB (no fue revocado por logout)
        const stored = await this.authRepository.findRefreshToken(refreshToken);
        if (!stored) throw new InvalidTokenException();

        //Verifica que no expiró en DB
        if (stored.expiresAt < new Date()) {
            await this.authRepository.deleteRefreshToken(refreshToken);
            throw new InvalidTokenException();
        }

        //Obtiene el usuario con roles y permisos actualizados
        const user = await this.userRepository.findByEmail(stored.userId);
        if (!user || !user.getActive) throw new InvalidTokenException();

        //Genera nuevos tokens (rotación de refresh token)
        const newPayload = {
            userId: user.getId!,
            email: user.getEmail,
            roles: user.getRoles,
            permissions: user.getPermissions,
        };

        const newAccessToken = jwtService.generateAccessToken(newPayload);
        const newRefreshToken = jwtService.generateRefreshToken(newPayload);
        const expiresAt = jwtService.getRefreshExpiresDate();

        //Revoca el refresh token anterior y guarda el nuevo
        await this.authRepository.deleteRefreshToken(refreshToken);
        await this.authRepository.saveRefreshToken(user.getId!, newRefreshToken, expiresAt);

        return {
            accessToken: newAccessToken,
            refreshToken: newRefreshToken,
            expiresIn: 900,
            user: { id: user.getId!, email: user.getEmail, roles: user.getRoles }
        };
    }
}