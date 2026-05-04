export interface ILogoutPort {
    execute(refreshToken: string): Promise<void>;
}