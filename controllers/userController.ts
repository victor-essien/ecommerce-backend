import User from "../models/User";
import { Request, Response } from "express";
import PasswordReset  from "../models/PasswordReset";

export const requestResetPassword = async (req: Request, res:Response) => {
try {
    const {email} = req.body;
    const user = await User.findOne({email})
    if (!user) {
         res.status(404).json({
            success: 'Failed',
            message: "User not found"
        })
        return;
    }
    

} catch (error) {
    
}
}