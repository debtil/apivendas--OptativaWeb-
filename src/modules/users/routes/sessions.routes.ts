import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import SessionsCrontroller from "../controllers/SessionsController";

const sessionsRouter = Router();
const sessionsCrontroller = new SessionsCrontroller();

sessionsRouter.post('/', celebrate({
    [Segments.BODY]:{
        email: Joi.string().email().required(),
        password: Joi.string().required()
    }
}), sessionsCrontroller.create);

export default sessionsRouter;