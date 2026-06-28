
import Joi from "joi"
import { REQUEST_VALIDATION } from "../common/req.validation.constant.js"
import { CustomError } from "./CustomError.js"
import { StatusCodes } from 'http-status-codes';

export const validateCustomerRegistration = async (data) => {
    const schema = Joi.object({
        customerName: Joi.string().trim().min(REQUEST_VALIDATION.MIN.USERNAME).max(REQUEST_VALIDATION.MAX.USERNAME).required(),
        mobile: Joi.string().trim().min(REQUEST_VALIDATION.MIN.MOBILE).max(REQUEST_VALIDATION.MAX.MOBILE).required(),
        password: Joi.string().trim().min(REQUEST_VALIDATION.MIN.PASSWORD).max(REQUEST_VALIDATION.MAX.PASSWORD).required()
    })
    const { error, value } = schema.validate(data);
    if (error) throw new CustomError(error.details[0].message, StatusCodes.BAD_REQUEST);
    return value;
}


export const validateCustomerLogin = async (data) => {
    const schema = Joi.object({
        mobile: Joi.string().trim().min(REQUEST_VALIDATION.MIN.MOBILE).max(REQUEST_VALIDATION.MAX.MOBILE).required(),
        password: Joi.string().trim().min(REQUEST_VALIDATION.MIN.PASSWORD).max(REQUEST_VALIDATION.MAX.PASSWORD).required()
    })
    const { error, value } = schema.validate(data);
    if (error) throw new CustomError(error.details[0].message, StatusCodes.BAD_REQUEST);
    return value;
}
