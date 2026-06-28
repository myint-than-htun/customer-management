import { asyncErrorHandler } from "./error.controller.js";
import { CustomerService } from "../services/customer.services.js";
import { StatusCodes } from 'http-status-codes';
import * as reqValidator from '../utils/request.validator.js'
import * as requestDto from '../dto/requests/customer.req.dtos.js'

const customerService = new CustomerService();

export const registerCustomer = asyncErrorHandler(async (req, res) => {
    const customerReq = requestDto.formatCreateCustomerReqDto(req.body.customerName, req.body.mobile, req.body.password);
    const validatedReq = await reqValidator.validateCustomerRegistration(customerReq)

    const result = await customerService.customerRegistration(validatedReq.customerName, validatedReq.mobile, validatedReq.password);

    res.status(StatusCodes.OK).json(result);
});

export const customerLogin = asyncErrorHandler(async (req, res) => {
    const customerReq = requestDto.formatLoginReqDto(req.body.mobile, req.body.password);
    const validatedReq = await reqValidator.validateCustomerLogin(customerReq)

    const result = await customerService.customerLogin(validatedReq.mobile, validatedReq.password);

    res.status(StatusCodes.OK).json(result);
});

export const getAllCustomers = asyncErrorHandler(async (req, res) => {
    const customers = await customerService.getCustomers();

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: customers
    });
});