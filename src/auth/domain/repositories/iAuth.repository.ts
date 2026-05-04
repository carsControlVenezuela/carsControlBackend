export interface IAuthRepository {
    saveRefreshToken(userId: string, token: string, expiresAt: Date): Promise<void>;
    findRefreshToken(token: string): Promise<{ userId: string; expiresAt: Date } | null>;
    deleteRefreshToken(token: string): Promise<void>;
    deleteAllUserRefreshTokens(userId: string): Promise<void>;
}