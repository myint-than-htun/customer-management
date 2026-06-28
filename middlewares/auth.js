

import { validateSignature } from "./auth.utils.js";
import { StatusCodes } from "http-status-codes";

const authMiddleware = async (req, res, next) => {
    const status = await validateSignature(req);
    if (status == StatusCodes.OK) {
        return next();
    }
    if (status == StatusCodes.UNAUTHORIZED) {
        return res.status(status).json({ message: 'UNAUTHORIZED' })
    }
    return res.status(status).json({ message: 'FORBIDDEN' })
}

export default authMiddleware;
