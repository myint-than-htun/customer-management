
import { CustomerRepository } from "../repositories/customer.repo.js"
import { CustomerSessionRepository } from "../repositories/customer.session.repo.js"
import * as commonUtils from "../utils/common.utils.js"
import * as apiResponse from "../dto/responses/api.res.dto.js"
import * as authUtils from "../middlewares/auth.utils.js"
import * as resposeDto from "../dto/responses/customer.res.dtos.js"

export class CustomerService {

    constructor() {
        this.customerRepository = new CustomerRepository();
        this.customerSessionRepository = new CustomerSessionRepository();
    }

    async customerRegistration(customerName, mobile, password) {
        var response = apiResponse.getApiResponseDto();
        response.status = 'success'

        const isValidMobile = commonUtils.validateMobile(mobile);
        if (isValidMobile) {
            const customer = await this.customerRepository.getCustomerByMobile(mobile);
            const isAlreadyRegister = customer ? true : false;

            if (isAlreadyRegister) {
                response.status = 'fail'
                response.message = 'This mobile is already registered.'

            } else {
                const saltKey = await authUtils.generateSalt();
                const encryptPassword = await authUtils.generatePassword(password, saltKey);
                await this.customerRepository.createCustomer(customerName, mobile, encryptPassword);

                const loginResponse = await this.customerLogin(mobile, password);
                return loginResponse;
            }
        } else {
            response.status = 'fail'
            response.message = 'Invalid mobile number.'
        }

        return response
    }

    async customerLogin(mobile, password) {
        var response = apiResponse.getApiResponseDto();
        response.status = 'success'

        const isValidMobile = commonUtils.validateMobile(mobile);
        if (isValidMobile) {
            const customer = await this.customerRepository.getCustomerByMobile(mobile);
            if (customer) {
                const isValid = await authUtils.validatePassword(password, customer.password);
                if (isValid) {
                    const currentTime = new Date(Date.now()).getTime();
                    const sessionName = commonUtils.generateSessionName();

                    const sessionInfo = this.customerSessionRepository.getSessionByCustomerId(customer.customerId);
                    if (sessionInfo) {
                        await this.customerSessionRepository.updateCustomerSession(customer.customerId, sessionName, currentTime)
                    } else {
                        await this.customerSessionRepository.createCustomerSession(customer.customerId, sessionName, currentTime);
                    }

                    const accessToken = await authUtils.generateSignature(customer.customerId, sessionName);
                    const refreshToken = await authUtils.generateRefreshSignature(customer.customerId, sessionName, currentTime);
                    const loginResponse = resposeDto.formatLoginResDto(customer.customerId, customer.customerName, customer.mobile, accessToken, refreshToken)

                    response.status = 'success'
                    response.message = 'Login success.'
                    response.data = loginResponse
                } else {
                    response.status = 'fail'
                    response.message = 'Mobile or password incorrect.'
                }
            } else {
                response.status = 'fail'
                response.message = 'Mobile or password incorrect.'
            }
        } else {
            response.status = 'fail'
            response.message = 'Invalid mobile number.'
        }

        return response
    }

    async getCustomers() {
        const customers = await this.customerRepository.getCustomers();
        return customers.map(customer => resposeDto.formatGetCustomersResDto(customer));
    }

}