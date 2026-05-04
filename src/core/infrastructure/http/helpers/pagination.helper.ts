import { Request } from 'express';
import { PaginationParams } from '../../../domain/types/pagination.types';

export function getPaginationParams(req: Request): PaginationParams {
    const page  = Math.max(1, parseInt(req.query.page  as string) || 1);
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit as string) || 10));
    return { page, limit };
}