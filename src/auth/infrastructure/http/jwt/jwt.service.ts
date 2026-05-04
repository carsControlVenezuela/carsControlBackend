import jwt, { SignOptions } from 'jsonwebtoken';
import { InvalidTokenException } from '../../../domain/exceptions/invalidToken.exception';

export interface JwtPayload {
    userId: string;
    email: string;
    roles: string[];
    permissions: string[];
}

export class JwtService {
    private readonly accessSecret: string;
    private readonly refreshSecret: string;
    private readonly accessExpires: string;
    private readonly refreshExpires: string;

    constructor() {
        this.accessSecret = process.env.JWT_ACCESS_SECRET!;
        this.refreshSecret = process.env.JWT_REFRESH_SECRET!;
        this.accessExpires = process.env.JWT_ACCESS_EXPIRES  || '15m';
        this.refreshExpires = process.env.JWT_REFRESH_EXPIRES || '30d';
    }

    generateAccessToken(payload: JwtPayload): string {
        const options: SignOptions = { expiresIn: this.accessExpires as SignOptions['expiresIn'] };
        return jwt.sign(payload, this.accessSecret, options);
    }

    generateRefreshToken(payload: JwtPayload): string {
        const options: SignOptions = { expiresIn: this.refreshExpires as SignOptions['expiresIn'] };
        return jwt.sign(payload, this.refreshSecret, options);
    }

    verifyAccessToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.accessSecret) as JwtPayload;
        } catch {
            throw new InvalidTokenException();
        }
    }

    verifyRefreshToken(token: string): JwtPayload {
        try {
            return jwt.verify(token, this.refreshSecret) as JwtPayload;
        } catch {
            throw new InvalidTokenException();
        }
    }

    getRefreshExpiresDate(): Date {
        const days = parseInt(this.refreshExpires.replace('d', ''));
        const date = new Date();
        date.setDate(date.getDate() + days);
        return date;
    }
}

export const jwtService = new JwtService();