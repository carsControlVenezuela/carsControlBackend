import { DataSource, Repository } from 'typeorm';
import { IAuthRepository } from '../../../domain/repositories/iAuth.repository';
import { RefreshTokenEntity } from '../psql/typeorm/entities/refreshToken.typeorm.entity';

export class AuthTypeormRepository implements IAuthRepository {
    
    private readonly repo: Repository<RefreshTokenEntity>;

    constructor(dataSource: DataSource) {
        this.repo = dataSource.getRepository(RefreshTokenEntity);
    }

    async saveRefreshToken(idUser: string, token: string, expiresAt: Date): Promise<void> {
        const entity = this.repo.create({ idUser, token, expiresAt });
        await this.repo.save(entity);
    }

    async findRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null> {
        const entity = await this.repo.findOneBy({ token });
        if (!entity) return null;
        return { userId: entity.idUser, expiresAt: entity.expiresAt };
    }

    async deleteRefreshToken(token: string): Promise<void> {
        await this.repo.delete({ token });
    }

    async deleteAllUserRefreshTokens(userId: string): Promise<void> {
        await this.repo.delete({ idUser: userId });
    }
}