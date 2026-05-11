import { PermissionMapper } from '../mappers/permission.mapper';
import { IUpdatePermissionPort } from '../ports/iUpdatePermission.port';
import { IPermissionRepository } from '../../domain/repositories/iPermission.repository';
import { UpdatePermissionInputDto } from '../dtos/requests/updatePermission.requet.dto';
import { findPermissionOrFail } from '../helpers/findPermissionOrFail.helper';
import { PermissionAlreadyExistsException } from '../../domain/exceptions/permissionAlreadyExists.exception';

export class UpdatePermissionUseCase implements IUpdatePermissionPort {

  constructor( private readonly permissionRepository: IPermissionRepository ) {}

  async execute(id: string, dto: UpdatePermissionInputDto): Promise<void> {

    const permission = await findPermissionOrFail(this.permissionRepository, id);

    if (dto.resource || dto.action) {

      const resource = dto.resource ?? permission.getResource; //dto.resource es null o undefined, entonces la variable resource tomará el valor de permission.getResource

      const action = dto.action ?? permission.getAction; //Si dto.action tiene cualquier valor (un string, un objeto, un 0 o un false), la variable action tomará ese valor

      const exists = await this.permissionRepository.findByResourceAndAction(resource, action);

      if (exists && exists.getId !== id) throw new PermissionAlreadyExistsException(resource, action);

    }

    await this.permissionRepository.update(PermissionMapper.merge(permission, dto));

  }

}