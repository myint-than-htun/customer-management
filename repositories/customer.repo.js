
import { query } from "../database/mysqldb.js";
import { toCustomer } from "../mappers/customer.mapper.js";

export class CustomerRepository {

    async getCustomers() {
        const rows = await query(`SELECT * FROM customers`);
        return rows.map(toCustomer);
    }

    async getCustomerByMobile(mobile) {
        var rows = await query(`SELECT * FROM customers WHERE mobile = ?`, [mobile]);
        rows = rows.map(toCustomer);
        return rows?.length ? rows[0] : null;
    }

    async getCustomerById(customerId) {
        var rows = await query(`SELECT * FROM customers WHERE customer_id = ?`, [customerId]);
        rows = rows.map(toCustomer);
        return rows?.length ? rows[0] : null;
    }

    async createCustomer(customerName, mobile, password) {
        var result = await query(`INSERT INTO customers (customer_name, mobile, password) VALUES (?, ?, ?)`, [customerName, mobile, password]);
        return result;
    }
}