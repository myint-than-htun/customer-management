

export function formatLoginResDto(customerId, customerName, mobile, accessToken, refreshToken) {
    return {
        customerId: customerId,
        customerName: customerName,
        mobile: mobile,
        accessToken: accessToken,
        refreshToken: refreshToken
    }
}

export function formatGetCustomersResDto(customer) {
    return {
        customerId: customer.customerId,
        customerName: customer.customerName,
        mobile: customer.mobile
    }
}