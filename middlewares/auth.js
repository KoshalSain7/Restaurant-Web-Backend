import ErrorHandler from "../utils/errorHandler.js";

export const isAuthenticated = (req, res, next) => {
    const token = req.cookies;
    if (!token) {
        return next(new ErrorHandler('Not Logged In', 401))
    }
    next();
}
export const adminOnly = (req, res, next) => {

    if (req.user.role !== 'admin') {
        return next(new ErrorHandler('Only Admin Allowed To This Route', 401))
    }
    next();
}