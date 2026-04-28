/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepPartial, FindOptionsWhere, Repository } from "typeorm";
import { AuditEntity } from "../../../domain/entities/audit.entity";
import { AuditTypeormEntity } from "../psql/typeorm/audit.typeorm.entity";
import { IBaseRepository } from "../../../domain/repositories/base.repository";
import { PaginatedResult, PaginationParams } from "../../../domain/types/pagination.types";

/* 
    * TDomain: Representa tu objeto de negocio (Capa de Dominio). Debe extender de AuditEntity.
    * TEntity: Representa la tabla en la base de datos (Capa de Infraestructura). Debe ser una entidad de TypeORM.
*/ 

export abstract class BaseTypeormRepository<TDomain extends AuditEntity, TEntity extends AuditTypeormEntity> implements IBaseRepository<TDomain> {

    constructor(protected readonly repo: Repository<TEntity>) {}

    // cada repositorio hijo define cómo convertir entre Domain y TypeORM
    protected abstract toDomain(entity: TEntity): TDomain; //Convierte un objeto de base de datos a un objeto de negocio.
    protected abstract toPersistence(domain: TDomain): DeepPartial<TEntity>; //Convierte un objeto de negocio a algo que TypeORM entienda
    
    protected getRelations(): string[] {
        return []; // por defecto no hay relaciones, los repositorios hijos pueden sobrescribir esto si necesitan cargar relaciones
    }

    async findById(id: string): Promise<TDomain | null> {

        const options: FindOptionsWhere<TEntity> = {id: id} as any; 

        const entity = await this.repo.findOne({where: options, relations: this.getRelations()});

        if (!entity){
            return null;
        }

        return this.toDomain(entity);
    }

    async findAll(): Promise<TDomain[]> {
        const entities = await this.repo.find({ relations: this.getRelations() });
        return entities.map(e => this.toDomain(e));
    }

    async findAllActive(): Promise<TDomain[]> {
        const entities = await this.repo.find({
            where: { active: true } as FindOptionsWhere<TEntity>,
            relations: this.getRelations()
        });
        return entities.map(e => this.toDomain(e));
    }

    async findByName(name: string): Promise<TDomain | null> {

        const options: FindOptionsWhere<TEntity> = {name: name} as any;

        const entity = await this.repo.findOne({where: options,relations: this.getRelations()});

        if (!entity) {
            return null;
        }

        return this.toDomain(entity);
    }

    async update(domain: TDomain): Promise<TDomain> {
        await this.repo.save(this.toPersistence(domain));
        return domain;
    }

    async findAllPaginated(params: PaginationParams): Promise<PaginatedResult<TDomain>> {

        const { page, limit } = params;
        const skip = (page - 1) * limit;

        const [entities, total] = await this.repo.findAndCount({
            relations: this.getRelations(),
            skip,
            take:      limit,
            order:     { createdAt: 'DESC' } as any
        });

        return this.buildPaginatedResult(entities.map(e => this.toDomain(e)), total, params);
    }

    async findAllActivePaginated(params: PaginationParams): Promise<PaginatedResult<TDomain>> {

        const { page, limit } = params;
        const skip = (page - 1) * limit;

        const [entities, total] = await this.repo.findAndCount({
            where:     { active: true } as FindOptionsWhere<TEntity>,
            relations: this.getRelations(),
            skip,
            take:      limit,
            order:     { createdAt: 'DESC' } as any
        });

        return this.buildPaginatedResult(entities.map(e => this.toDomain(e)), total, params);
    }

    private buildPaginatedResult<T>(data: T[], total: number, params: PaginationParams): PaginatedResult<T> {
        const totalPages = Math.ceil(total / params.limit);
        return {
            data,
            total,
            page:       params.page,
            limit:      params.limit,
            totalPages,
            hasNext:    params.page < totalPages,
            hasPrev:    params.page > 1
        };
    }
}