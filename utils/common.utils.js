
import * as commonConstants from "../common/common.constants.js"
import ShortUniqueId from "short-unique-id"

export function generateSessionName() {
    const uid = new ShortUniqueId({ length: 10 })
    const currentTime = new Date(Date.now()).getTime().toString()
    return (uid.rnd() + currentTime)
}

export function validateMobile(mobile) {
    const myanmarMobilePrefixes = commonConstants.MYANMAR_MOBILE_PREFIXES

    if (mobile === null || mobile === "") return false

    var pattern = new RegExp(/^\d+$/)
    if (!pattern.test(mobile)) return false

    const mobileNumber = parseInt(mobile)
    if (isNaN(mobileNumber)) return false

    var isValid = true
    var twoPrefix = mobile.substring(0, 2)

    switch (mobile.length) {
        case 9:
            if (!myanmarMobilePrefixes.prefixLength9.includes(twoPrefix)) isValid = false
            break
        case 8:
            if (!myanmarMobilePrefixes.prefixLength8.includes(twoPrefix)) isValid = false
            break
        case 7:
            if (!myanmarMobilePrefixes.prefixLength7.includes(twoPrefix)) isValid = false
            break
        case 6:
            if (!myanmarMobilePrefixes.prefixLength6.includes(twoPrefix)) isValid = false
            break
        default:
            isValid = false
            break
    }
    return isValid
}