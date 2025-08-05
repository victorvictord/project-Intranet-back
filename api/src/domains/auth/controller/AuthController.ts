import type { Request, Response } from 'express';
import { LoginUser } from '../application/LoginUser';
import { AuthRepo } from '../infrastructure/AuthRepo';

const loginUseCase = new LoginUser(new AuthRepo());

export async function login(req: Request, res: Response){
    const {email, password} = req.body;
    try{
        const {token, user} = await loginUseCase.execute(email, password);
        res.json({token, user});
    }catch {
        res.status(401).json({error: 'Invalid credencials'});
    }
}