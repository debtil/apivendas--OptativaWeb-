import { Request, Response } from "express";
import SendForgotEmailPasswordService from "../services/SendForgotPasswordEmailService";

export default class ForgotPasswordController{
    public async create(request: Request, response: Response): Promise<Response>{
        const {email} = request.body;
        const sendForgotPssswordEmail = new SendForgotEmailPasswordService();
        await sendForgotPssswordEmail.execute({email});
        return response.status(204).json();
    }
}