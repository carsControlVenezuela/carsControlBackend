import { Router } from 'express';
import { LoginUseCase } from '../../../application/uses-cases/login.use-case';
import { UserTypeormRepository } from '../../../../user/infrastructure/database/repositories/user.repository';
import { AppDataSource } from '../../../../database/typeorm/typeorm.config';
import { AuthTypeormRepository } from '../../database/repositories/auth.repository';
import { RegisterUseCase } from '../../../application/uses-cases/register.use-case';
import { RefreshTokenUseCase } from '../../../application/uses-cases/refreshToken.use-case';
import { LogoutUseCase } from '../../../application/uses-cases/logout.use-case';
import { LoginController } from '../controllers/login.controller';
import { RegisterController } from '../controllers/register.controller';
import { RefreshTokenController } from '../controllers/refreshToken.controller';
import { LogoutController } from '../controllers/logout.controller';
import { validateDto } from '../../../../core/infrastructure/middlewares/validateDto.middleware';
import { LoginRequestDTO } from '../dtos/requests/login.request.dto';
import { RegisterRequestDTO } from '../dtos/requests/register.request.dto';
import { PersonRepository } from '../../../../person/infrastructure/database/repositories/person.repository';
import { PersonEntity } from '../../../../person/infrastructure/database/psql/typeorm/entities/person.typeorm.entity';
import { RoleRepository } from '../../../../role/infrastructure/database/repositories/role.repository';
import { RoleEntity } from '../../../../role/infrastructure/database/psql/typeorm/entities/role.typeorm.entity';

const authRouter = Router();

//Mejorar
const personTypeormRepo = AppDataSource.getRepository(PersonEntity);
const personRepository = new PersonRepository(personTypeormRepo);

//Mejorar
const roleTypeormRepo = AppDataSource.getRepository(RoleEntity);
const roleRepository = new RoleRepository(roleTypeormRepo);

const userRepository = new UserTypeormRepository(AppDataSource);
const authRepository = new AuthTypeormRepository(AppDataSource);

const loginUseCase = new LoginUseCase(userRepository, authRepository);
const registerUseCase = new RegisterUseCase(userRepository, personRepository, authRepository, roleRepository);
const refreshTokenUseCase = new RefreshTokenUseCase(authRepository, userRepository);
const logoutUseCase = new LogoutUseCase(authRepository);

const loginController = new LoginController(loginUseCase);
const registerController = new RegisterController(registerUseCase);
const refreshTokenController = new RefreshTokenController(refreshTokenUseCase);
const logoutController = new LogoutController(logoutUseCase);

// rutas públicas - no requieren autenticación
authRouter.post('/login', validateDto(LoginRequestDTO), loginController.login);
authRouter.post('/register', validateDto(RegisterRequestDTO), registerController.register);
authRouter.post('/refresh-token', refreshTokenController.refreshToken);
authRouter.post('/logout', logoutController.logout);

export default authRouter;