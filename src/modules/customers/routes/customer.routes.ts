import { celebrate, Segments } from "celebrate";
import { Router } from "express";
import Joi from "joi";
import isAuthenticated from "src/shared/http/middlewares/isAuthenticated";
import CustomersController from "../controllers/CustomersController";

const customerRouter = Router();
const customerController = new CustomersController();

customerRouter.use(isAuthenticated);

customerRouter.get('/', customerController.index);

customerRouter.get('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), customerController.show);

customerRouter.post('/', celebrate({
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required()
    }
}), customerController.create);

customerRouter.put('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    },
    [Segments.BODY]: {
        name: Joi.string().required(),
        email: Joi.string().email().required()
    }
}), customerController.update);

customerRouter.delete('/:id', celebrate({
    [Segments.PARAMS]: {
        id: Joi.string().uuid().required()
    }
}), customerController.delete);

export default customerRouter;