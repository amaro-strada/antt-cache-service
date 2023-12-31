import { ConfigService } from '@nestjs/config';
import Strategy from 'passport-headerapikey';
declare const HeaderApiKeyStrategy_base: new (...args: any[]) => Strategy;
export declare class HeaderApiKeyStrategy extends HeaderApiKeyStrategy_base {
    private readonly configService;
    constructor(configService: ConfigService);
    validate: (apiKey: string, done: (error: Error, data: any) => {}) => void;
}
export {};
