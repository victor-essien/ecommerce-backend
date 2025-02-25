import JWT from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const userAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.split(" ")[1];
  console.log(token);
  if (!token) return res.status(401).json({ message: "Access Denied" });
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET!);
    req.body.user = decoded;
    next();
  } catch (error) {
    res.status(403).json({ message: "Invalid Token" });
  }
};

export const authotizeRole = (roles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (roles.includes(req.body.user.role)) {
      return res.status(403).json({ message: "Access Denied" });
    }
    next();
  };
}; 
