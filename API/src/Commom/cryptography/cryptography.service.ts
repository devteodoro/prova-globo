import { Injectable } from '@nestjs/common';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';

const scrypt = promisify(_scrypt);

@Injectable()
export class CryptographyService {

    async encripty(password: string){
        const salt = randomBytes(8).toString('hex');
        const hash = await scrypt(password, salt, 32) as Buffer;
        return `${salt}.${hash.toString('hex')}`;
    }

    async ValidatePassword(password:string, attempt: string): Promise<boolean>{
        const [salt, storedHash] = password.split('.');
        const hash = (await scrypt(attempt, salt, 32)) as Buffer;

        if(storedHash != hash.toString('hex'))
            return false;

        return true;
    }
}
