
import bcrypt from 'bcryptjs';
import JWT from 'jsonwebtoken';


export const hashString = async (value:string) => {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(value, salt);
    return hashedPassword;
}

export const compareString = async (value:string, hashedValue:string) => {
    const matched = await bcrypt.compare(value, hashedValue);
    return matched;
}

export function createJWT(id:string, role:string) {
    return JWT.sign({id, role}, process.env.JWT_SECRET!)
}
    
