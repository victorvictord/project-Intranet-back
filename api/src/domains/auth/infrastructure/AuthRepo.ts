import type { AuthService } from "../domain/AuthService";
import bcrypt from 'bcryptjs';

const users = [
    {id: '1', email: 'victorvictord@gmail.com', passwordHash: bcrypt.hashSync('secret',8)}
];

export class AuthRepo implements AuthService {
    async validateUser(email: string, password: string){
        const user = users.find(user => user.email === email);
        if(user && bcrypt.compareSync(password, user.passwordHash)) {
            return {id: user.id, email: user.email};
        }
        return null;
    }
}