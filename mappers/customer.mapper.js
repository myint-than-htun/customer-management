import { Customer } from "../models/Customer.js";

export function toCustomer(row) {
    return new Customer({
        customerId: row.customer_id,
        firstName: row.first_name,
        lastName: row.last_name
    })
}