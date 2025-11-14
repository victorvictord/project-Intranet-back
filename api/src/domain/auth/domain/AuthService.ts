export interface AuthService {
    validateUser(email: string, password:string): Promise<{id: string; email:string;} | null>;
}