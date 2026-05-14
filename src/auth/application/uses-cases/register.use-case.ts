import bcrypt from 'bcryptjs';
import { IRegisterPort } from '../ports/register.port';
import { User } from '../../../user/domain/entities/user.entity';
import { IUserRepository } from '../../../user/domain/repositories/iUser.repository';
import { RegisterInputDto } from '../dtos/requests/register.request.dto';
import { AuthResponseDto } from '../dtos/responses/auth.reponse.dto';
import { IAuthRepository } from '../../domain/repositories/iAuth.repository';
import { UserAlreadyExistsException } from '../../../user/domain/exceptions/userAlreadyExists.exception';
import { jwtService } from '../../infrastructure/http/jwt/jwt.service';
import { IPersonRepository } from '../../../person/domain/repositories/iPerson.repository';
import { IRoleRepository } from '../../../role/domain/repositories/iRole.repository';
import { Person } from '../../../person/domain/entities/person.entity';
import { RoleNotFoundException } from '../../../role/domain/exceptions/roleNotFound.exception';

export class RegisterUseCase implements IRegisterPort {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly personRepository: IPersonRepository,
        private readonly authRepository: IAuthRepository,
        private readonly roleRepository: IRoleRepository,
    ) {}

    async execute(request: RegisterInputDto): Promise<AuthResponseDto> {

        //Busca por email ya que es la unica forma de buscar si existe o no el usuario antes de registrarlo, ya que el id se genera al momento de guardar el usuario y no lo tenemos antes de eso.  
        const exists = await this.userRepository.findByEmail(request.email);

        if (exists) {
            throw new UserAlreadyExistsException(request.email);
        }
        
        //Busca el rol que el usuario eligió
        const role = await this.roleRepository.findById(request.roleId);
        
        if (!role) {
            throw new RoleNotFoundException(request.roleId);
        }

        const permissions = role?.getPermissions.map(p => `${p.getResource}:${p.getAction}`) ?? [];

        const hashedPassword = await bcrypt.hash(request.password, parseInt(process.env.BCRYPT_SALT_ROUNDS || '12'));

        const user = new User(request.email, hashedPassword, [role.getName], permissions);

        const saved = await this.userRepository.save(user);

        //Asignar rol USER en DB
        await this.userRepository.assignRole(saved.getId!, role!.getId!);

        //Crear Person asociada al User
        const person = new Person(
            saved.getId!,
            //request.idPostalZone,
            request.cedula,
            request.firstName,
            request.lastName,
            new Date(request.birthday),
            request.gender,
            request.avatar,
            request.middleName,
            request.secondName
        );
        
        await this.personRepository.save(person);

        const payload = {
            userId: saved.getId!,
            email: saved.getEmail,
            roles: [role.getName],
            permissions
        };

        const accessToken  = jwtService.generateAccessToken(payload);
        const refreshToken = jwtService.generateRefreshToken(payload);
        const expiresAt    = jwtService.getRefreshExpiresDate();

        await this.authRepository.saveRefreshToken(saved.getId!, refreshToken, expiresAt);

        return {
            accessToken,
            refreshToken,
            expiresIn: parseInt(process.env.JWT_EXPIRES_IN_SECONDS || '900'),
            user: { id: saved.getId!, email: saved.getEmail, roles: [role.getName] }
        };
    }
}
