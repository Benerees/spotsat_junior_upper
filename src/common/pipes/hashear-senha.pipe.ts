import { Injectable, PipeTransform } from '@nestjs/common';
import 'dotenv/config';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashearSenhaPipe implements PipeTransform {
    async transform(senha: any,) {
        const funcHash = process.env.HASH_FUNC;

        const senhaHasheada =  await bcrypt.hash(senha, funcHash);

        return senhaHasheada;
    }

}
