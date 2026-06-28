import { Customer } from "../models/Customer.js";

export function toCustomer(row) {
    return new Customer({
        customerId: row.customer_id,
        customerName: row.customer_name,
        mobile: row.mobile,
        password: row.password
    })
}