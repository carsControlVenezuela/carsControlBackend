import { PermissionMapper } from '../mappers/permission.mapper';
import { ICreatePermissionPort } from '../ports/iCreatePermission.port';
import { IPermissionRepository } from '../../domain/repositories/iPermission.repository';
import { CreatePermissionInputDto } from '../dtos/requests/createPermission.requet.dto';
import { PermissionAlreadyExistsException } from '../../domain/exceptions/permissionAlreadyExists.exception';

export class CreatePermissionUseCase implements ICreatePermissionPort{

    constructor(private readonly permissionRepository: IPermissionRepository) {}

    async execute(request: CreatePermissionInputDto): Promise<void> {

        const exists = await this.permissionRepository.findByResourceAndAction(request.resource, request.action);

        if (exists) {
            throw new PermissionAlreadyExistsException(request.resource, request.action);
        }

        await this.permissionRepository.save(PermissionMapper.toDomain(request));

    }

}