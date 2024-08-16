import jwt from "jsonwebtoken"
import { AppError, catchAsyncError } from "../../../utils/error.handler.js"
import UserModel from "../../User/Models/user.model.js"
import { TokenBlacklistModel } from "../Models/TokenBlacklist.Model.js"
 const authenticate = (req, res, next) => {
	const token = req.header('token')
	if (!token) throw new AppError('Unauthorized', 401)
	try {
		const decoded = jwt.verify(token, process.env.SECRET)
		req.user = decoded
		next()
	} catch (error) {
		throw new AppError(error.message, 498)
	}
}

 const authorize = (role) => {
	return (req, res, next) => {
		if (role !== req.user.role) throw new AppError('Forbidden', 403)
		next()
	}
}

const checkBlacklist = catchAsyncError(async (req, res, next) => {
    const token = req.header('token')
    
    if (!token) {
        throw new AppError('No token provided', 400);
    }

    const blacklistedToken = await TokenBlacklistModel.findOne({ token });

    if (blacklistedToken) {
        throw new AppError('Token is blacklisted', 401);
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = decoded;

    next();
});


export{

    authenticate,
    authorize,
    checkBlacklist
}