import { DataSource, Repository } from 'typeorm';
import { IUserRepository } from '../../../domain/repositories/iUser.repository';
import { UserEntity } from '../psql/typeorm/entities/user.typeorm.entity';
import { User } from '../../../domain/entities/user.entity';

export class UserTypeormRepository implements IUserRepository {
    private readonly repo: Repository<UserEntity>;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(UserEntity);
    }

    //Se establece este mapper interno porque la lógica de construir roles y permisos es específica de este repositorio y no se reutiliza en ningún otro lugar
    private toDomain(entity: UserEntity): User {

        const roles = entity.roles?.map(r => r.name) ?? [];
        const permissions = entity.roles?.flatMap(r =>r.permissions?.map(p => `${p.resource}:${p.action}`) ?? []) ?? [];

        return new User(
            entity.email,
            entity.password,
            roles,
            permissions,
            entity.id,
            entity.createdAt,
            entity.updatedAt,
            entity.active
        );
    }

    async save(user: User): Promise<User> {
        const entity = this.repo.create({
            ...(user.getId && { id: user.getId }),
            email: user.getEmail,
            password: user.getPassword,
            active: user.getActive
        });
        const saved = await this.repo.save(entity);
        return this.toDomain(saved);
    }

    async findById(id: string): Promise<User | null> {
        const entity = await this.repo.findOne({where: { id },relations: ['roles', 'roles.permissions']});
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async findByEmail(email: string): Promise<User | null> {
        const entity = await this.repo.findOne({where: { email }, relations: ['roles', 'roles.permissions']});
        if (!entity) return null;
        return this.toDomain(entity);
    }

    async assignRole(userId: string, roleId: string): Promise<void> {
        await this.repo
            .createQueryBuilder()
            .relation(UserEntity, 'roles')
            .of(userId)
            .add(roleId);
    }
}
