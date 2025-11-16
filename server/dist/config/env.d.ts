interface Config {
    port: number;
    nodeEnv: string;
    databaseUrl: string;
    jwt: {
        secret: string;
        expiresIn: string;
    };
    passwordPolicy: {
        minLength: number;
        requireUppercase: boolean;
        requireLowercase: boolean;
        requireNumber: boolean;
        requireSpecialChar: boolean;
    };
    cors: {
        allowedOrigins: string[];
    };
    files: {
        exportDirectory: string;
        maxFileSizeMB: number;
    };
}
declare const config: Config;
export default config;
//# sourceMappingURL=env.d.ts.map