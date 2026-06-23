
import { CustomerRepository } from "../repositories/customer.repo.js"

export class CustomerService {

    constructor() {
        this.customerRepository = new CustomerRepository();
    }

    async getCustomers() {
        return this.customerRepository.getCustomers();
    }
}