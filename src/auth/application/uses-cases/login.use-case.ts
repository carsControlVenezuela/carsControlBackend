import bcrypt from 'bcryptjs';
import { ILoginPort } from '../ports/login.port';
import { IUserRepository } from '../../../user/domain/repositories/iUser.repository';
import { IAuthRepository } from '../../domain/repositories/iAuth.repository';
import { LoginInputDto } from '../dtos/requests/login.request.dto';
import { AuthResponseDto } from '../dtos/responses/auth.reponse.dto';
import { InvalidCredentialsException } from '../../domain/exceptions/invalidCredentials.exception';
import { jwtService } from '../../infrastructure/http/jwt/jwt.service';

export class LoginUseCase implements ILoginPort {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly authRepository: IAuthRepository,
  ) {}

  async execute(request: LoginInputDto): Promise<AuthResponseDto> {
    const user = await this.userRepository.findByEmail(request.email);
    if (!user) throw new InvalidCredentialsException();

    const validPassword = await bcrypt.compare(request.password, user.getPassword);
    if (!validPassword) throw new InvalidCredentialsException();

    if (!user.active) throw new InvalidCredentialsException();

    // extrae roles y permisos para el token
    const roles = user.getRoles;
    const permissions = user.getPermissions;
    // ['countries:read', 'states:write']

    const payload = {
      userId: user.getId!,
      email: user.getEmail,
      roles,
      permissions,
    };

    const accessToken = jwtService.generateAccessToken(payload);
    const refreshToken = jwtService.generateRefreshToken(payload);
    const expiresAt = jwtService.getRefreshExpiresDate();

    await this.authRepository.saveRefreshToken(user.getId!, refreshToken, expiresAt);

    return {
      accessToken,
      refreshToken,
      expiresIn: 900, // 15 minutos en segundos
      user: { id: user.getId!, email: user.getEmail, roles },
    };
  }
}
