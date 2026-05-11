import { IRoleRepository } from '../../domain/repositories/iRole.repository';
import { IPermissionRepository } from '../../../permission/domain/repositories/iPermission.repository';
import { ICreateRolePort } from '../ports/iCreateRole.port';
import { CreateRoleInputDto } from '../dtos/requests/createRole.request.dto';
import { RoleAlreadyExistsException } from '../../domain/exceptions/roleAlreadyExists.exception';
import { PermissionNotFoundException } from '../../../permission/domain/exceptions/permissionNotFound.exception';
import { RoleMapper } from '../mappers/role.mapper';

export class CreateRoleUseCase implements ICreateRolePort {

    constructor(
        private readonly roleRepository: IRoleRepository,
        private readonly permissionRepository: IPermissionRepository
    ) {}

    async execute(dto: CreateRoleInputDto): Promise<void> {

        const exists = await this.roleRepository.findByName(dto.name);
        
        if (exists) throw new RoleAlreadyExistsException(dto.name);

        //Valida que todos los permisos existen
        const permissions = await this.permissionRepository.findByIds(dto.permissionIds);

        if (permissions.length !== dto.permissionIds.length) {
            throw new PermissionNotFoundException('Uno o más permisos');
        }

        const role = RoleMapper.toDomain(dto, permissions);

        await this.roleRepository.save(role, permissions);

    }
}