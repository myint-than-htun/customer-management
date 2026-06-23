
import express from 'express'
import * as customerController from '../controllers/customer.controller.js'

const router = express.Router();

router.route('/').get(customerController.getAllCustomers)



export default router;