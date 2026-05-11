import { RoleMapper } from '../mappers/role.mapper';
import { IRoleRepository } from '../../domain/repositories/iRole.repository';
import { IPermissionRepository } from '../../../permission/domain/repositories/iPermission.repository';
import { UpdateRoleInputDto } from '../dtos/requests/updateRole.request.dto';
import { findByIdOrFail } from '../../../core/application/helpers/findByIdOrFail.helper';
import { RoleAlreadyExistsException } from '../../domain/exceptions/roleAlreadyExists.exception';
import { IUpdateRolePort } from '../ports/iUpdateRole.port';
import { PermissionNotFoundException } from '../../../permission/domain/exceptions/permissionNotFound.exception';
import { Permission } from '../../../permission/domain/entities/permission.entity';

export class UpdateRoleUseCase implements IUpdateRolePort {
    
    constructor(
        private readonly roleRepository: IRoleRepository,
        private readonly permissionRepository: IPermissionRepository
    ) {}

    async execute(id: string, dto: UpdateRoleInputDto): Promise<void> {

        const role = await findByIdOrFail(this.roleRepository, id, 'Rol');

        if (dto.name && dto.name !== role.getName) {

            const exists = await this.roleRepository.findByName(dto.name);
        
            if (exists) {throw new RoleAlreadyExistsException(dto.name)}
            
        }

        let permissions: Permission[] | undefined;

        if (dto.permissionIds) {

            permissions = await this.permissionRepository.findByIds(dto.permissionIds);

            if (permissions.length !== dto.permissionIds.length){
                
                throw new PermissionNotFoundException('Uno o más permisos');

            }

        }

        RoleMapper.merge(role, dto, permissions);

        await this.roleRepository.updateRoleWithPermissions(role, permissions);

    }
}