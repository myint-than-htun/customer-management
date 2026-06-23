import { asyncErrorHandler } from "./error.controller.js";
import { CustomerService } from "../services/customer.services.js";
import { StatusCodes } from 'http-status-codes';

const customerService = new CustomerService();

export const getAllCustomers = asyncErrorHandler(async (req, res) => {
    const customers = await customerService.getCustomers();

    res.status(StatusCodes.OK).json({
        status: 'success',
        data: customers
    });
});