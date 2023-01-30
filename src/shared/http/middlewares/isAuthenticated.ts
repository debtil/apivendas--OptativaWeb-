import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import AppError from "src/shared/errors/appError";

interface TokenPayload{
    iat: number;
    exp: number;
    sub: string;
}

export default function isAuthenticated(request: Request, response: Response, next: NextFunction): void {
    const authHeader = request.headers.authorization; 
    if(!authHeader){
        throw new AppError('JWT is missing');
    }
    const [type, token] = authHeader.split(' ');
    try{
        const decodeToken = verify(token, auth.jwt.secret);
        const { sub } = decodeToken as TokenPayload;
        request.user = { id : sub};
        return next();
    }catch{
        throw new AppError('Invalid JWT token');
    }
}