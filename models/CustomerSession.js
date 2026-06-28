
export class CustomerSession {
    constructor({ sessionId, customerId, sessionName, lastTimeLogin }) {
        this.sessionId = sessionId;
        this.customerId = customerId;
        this.sessionName = sessionName;
        this.lastTimeLogin = lastTimeLogin;
    }
}