import type { AuthService } from "../domain/AuthService";
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export class LoginUser {
    constructor(private readonly auth: AuthService) {}
    async execute(email: string, password: string){
        const user = await this.auth.validateUser(email,password);
        if(!user) throw new Error('Invalid credencials');
        const token = jwt.sign({sub: user.id, email: user.email}, JWT_SECRET, {expiresIn: '3h'});
        return { token, user}
    }
}