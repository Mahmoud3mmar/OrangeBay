import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import UserModel from "../Models/user.model.js";
import UserProfileModel from "../Models/userprofile.model.js";

const GetProfile = catchAsyncError(async (req, res) => {
    const userId = req.user.id; // Extract the user ID from req.user
    const user = await UserModel.findById(userId);
    
    if (!user) {
        throw new AppError('User not found', 404);
    } 

    const userProfile = await UserProfileModel.findById(user.profile);

    if (!userProfile) {
        throw new AppError('User profile not found', 404);
    }

    res.status(200).json({ message: 'Profile returned successfully', userProfile });
});

export {
    GetProfile
};
