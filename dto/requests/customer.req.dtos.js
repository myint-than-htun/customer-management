

export function formatCreateCustomerReqDto(customerName, mobile, password) {
    return {
        customerName: customerName,
        mobile: mobile,
        password: password
    }
}

export function formatLoginReqDto(mobile, password) {
    return {
        mobile: mobile,
        password: password
    }
}