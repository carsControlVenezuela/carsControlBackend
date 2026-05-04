import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
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

export class RegisterUseCase implements IRegisterPort {

    constructor(
        private readonly userRepository: IUserRepository,
        private readonly personRepository: IPersonRepository,
        private readonly authRepository: IAuthRepository,
        private readonly roleRepository: IRoleRepository,
    ) {}

    async execute(request: RegisterInputDto): Promise<AuthResponseDto> {

        const exists = await this.userRepository.findByEmail(request.email); //Busca por email ya que es la unica forma de buscar si existe o no el usuario antes de registrarlo, ya que el id se genera al momento de guardar el usuario y no lo tenemos antes de eso.  

        if (exists) {
            throw new UserAlreadyExistsException(request.email);
        }
        
        //Obtener el rol USER con sus permisos
        const userRole = await this.roleRepository.findByName('USER');

        const permissions = userRole?.getPermissions ?? [];

        const hashedPassword = await bcrypt.hash(request.password, 12);

        const user = new User(request.email, hashedPassword, ['USER'], permissions, uuidv4());

        const saved = await this.userRepository.save(user);

        //Asignar rol USER en DB
        await this.userRepository.assignRole(saved.getId!, userRole!.getId!);

        // crear Person asociada al User
        const person = new Person(
            saved.getId!,
            //request.idPostalZone,
            request.cedula,
            request.firstName,
            request.lastName,
            new Date(request.birthday),
            request.gender,
            undefined,
            request.middleName,
            request.secondName,
            uuidv4()
        );
        
        await this.personRepository.save(person);

        const payload = {
            userId: saved.getId!,
            email: saved.getEmail,
            roles: ['USER'],
            permissions
        };

        const accessToken  = jwtService.generateAccessToken(payload);
        const refreshToken = jwtService.generateRefreshToken(payload);
        const expiresAt    = jwtService.getRefreshExpiresDate();

        await this.authRepository.saveRefreshToken(saved.getId!, refreshToken, expiresAt);

        return {
            accessToken,
            refreshToken,
            expiresIn: 900,
            user: { id: saved.getId!, email: saved.getEmail, roles: ['USER'] }
        };
    }
}
