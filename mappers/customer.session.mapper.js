
import { CustomerSession } from "../models/CustomerSession.js"

export function toCustomerSession(row) {
    return new CustomerSession({
        sessionId: row.session_id,
        customerId: row.customer_id,
        sessionName: row.session_name,
        lastTimeLogin: row.last_time_login
    })
}