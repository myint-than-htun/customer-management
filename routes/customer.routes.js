
import express from 'express'
import * as customerController from '../controllers/customer.controller.js'
import authMiddleware from '../middlewares/auth.js';

const router = express.Router();

router.route('/').get(authMiddleware, customerController.getAllCustomers)

router.route('/').post(customerController.registerCustomer)

router.route('/login').post(customerController.customerLogin)


export default router;