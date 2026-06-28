

import { query } from "../database/mysqldb.js";
import { toCustomerSession } from "../mappers/customer.session.mapper.js";

export class CustomerSessionRepository {

    async getCustomerSessions() {
        const rows = await query(`SELECT * FROM customer_sessions`);
        return rows.map(toCustomerSession);
    }

    async getSessionByCustomerId(customerId) {
        var rows = await query(`SELECT * FROM customer_sessions WHERE customer_id = ?`, [customerId]);
        rows = rows.map(toCustomerSession);
        return rows?.length ? rows[0] : null;
    }

    async createCustomerSession(customerId, sessionName, lastTimeLogin) {
        const result = await query(`INSERT INTO customer_sessions (customer_id, session_name, last_time_login) VALUES (?, ?, ?)`, [customerId, sessionName, lastTimeLogin]);
        return result
    }

    async updateCustomerSession(customerId, sessionName, lastTimeLogin) {
        const result = await query(`UPDATE customer_sessions SET session_name = ?, last_time_login = ? WHERE customer_id = ?`, [sessionName, lastTimeLogin, customerId]);
        return result
    }
}