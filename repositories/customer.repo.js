
import { query } from "../database/mysqldb.js";
import { toCustomer } from "../mappers/customer.mapper.js";

export class CustomerRepository {

    async getCustomers() {
        const rows = await query(`SELECT * FROM customers`);
        return rows.map(toCustomer);
    }
}