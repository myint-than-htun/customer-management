
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';
import { appProperties } from "../configs/properties.js";
import { CustomerSessionRepository } from "../repositories/customer.session.repo.js";
import { StatusCodes } from "http-status-codes";

export const generateSalt = async () => {
    return await bcrypt.genSalt()
}

export const generatePassword = async (password, salt) => {
    return await bcrypt.hash(password, salt)
}

export const validatePassword = async (enteredPassword, savedPassword) => {
    return await bcrypt.compare(enteredPassword, savedPassword);
}

export const generateSignature = async (customerId, sessionName) => {
    const payload = {
        customerId: customerId,
        sessionName: sessionName
    }
    return jwt.sign(payload, appProperties.authentication.TOKEN_SECRET, { expiresIn: appProperties.authentication.TOKEN_EXPIRE })
}

export const generateRefreshSignature = async (customerId, sessionName, currentTime) => {
    const payload = {
        customerId: customerId,
        sessionName: sessionName,
        currentTime: currentTime
    }
    return jwt.sign(payload, appProperties.authentication.REFRESH_SECRET)
}

export const validateSignature = async (req) => {
    const sessionRepository = new CustomerSessionRepository()
    const signature = req.get('Authorization')
    var currentCustomerId = req.body.customerId
    if (currentCustomerId == undefined) {
        currentCustomerId = req.query.customerId
    }
    if (signature) {
        try {
            const payload = jwt.verify(signature.split(' ')[1], appProperties.authentication.TOKEN_SECRET)
            const sessionInfo = await sessionRepository.getSessionByCustomerId(currentCustomerId)
            if (sessionInfo.sessionName == payload.sessionName && sessionInfo.customerId == payload.customerId) return StatusCodes.OK
            return StatusCodes.FORBIDDEN
        } catch {
            return StatusCodes.UNAUTHORIZED
        }
    }
    return StatusCodes.UNAUTHORIZED
}

export const validateRefreshSignature = async (req) => {
    const sessionRepository = new CustomerSessionRepository()
    const signature = req.get('Authorization')
    var currentCustomerId = req.body.customerId
    if (currentCustomerId == undefined) {
        currentCustomerId = req.query.customerId
    }

    if (signature) {
        try {
            const payload = jwt.verify(signature.split(' ')[1], appProperties.authentication.REFRESH_SECRET)
            const sessionInfo = await sessionRepository.getSessionByCustomerId(currentCustomerId)
            if (sessionInfo.sessionName == payload.sessionName && sessionInfo.customerId == payload.customerId) {
                return { statusCode: StatusCodes.OK, payload: payload }
            }
            return { statusCode: StatusCodes.FORBIDDEN, payload: null }
        } catch {
            return { statusCode: StatusCodes.UNAUTHORIZED, payload: null }
        }
    }
    return { statusCode: StatusCodes.UNAUTHORIZED, payload: null }
}