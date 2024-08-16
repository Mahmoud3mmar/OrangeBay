import bcrypt from 'bcrypt'


import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import UserModel from '../../User/Models/user.model.js';
import jwt from 'jsonwebtoken';
import { TokenBlacklistModel } from '../Models/TokenBlacklist.Model.js';
import UserProfileModel from '../../User/Models/userprofile.model.js';
// import { validatePhoneNumber } from '../../../utils/PhoneNumber.js';
// import { sendConfirmationSMS } from '../../../utils/Twilio.Handler.js';


import crypto from 'crypto'
import sendEmailService from '../../../utils/Send.Email.Service.js';






const signin = catchAsyncError(async (req, res) => {

    const { phone, password } = req.body
    const existeduser = await UserModel.findOne({ phone })

    if (!existeduser || !bcrypt.compareSync(password, existeduser.password)) throw new AppError('Invalid credentials', 400)

    const { name, _id: id } = existeduser

    // Generate access token
    const token = jwt.sign({ name, id }, process.env.SECRET, { expiresIn: '1h' })

   

    res.status(201).json({ token, message: 'Signed in successfully ..' })
})


// const signup = catchAsyncError(async (req, res) => {
//     const { name, countryCode, phone, password } = req.body;

//     // Validate that required fields are present
//     if (!name || !countryCode || !phone || !password) {
//         throw new AppError('Please provide all required fields', 400);
//     }
//     // Validate the phone number
//     if (!validatePhoneNumber(phone, countryCode)) {
//         throw new AppError('Invalid phone number for the specified country', 400);
//     }
//     // Check if the user already exists
//     const existingUser = await UserModel.findOne({ phone });
//     if (existingUser) {
//         throw new AppError('User with this phone number already exists', 409);

//     }

//     // Send confirmation SMS
//     const confirmationMessage = `Hello ${name}, thank you for signing up!`;
//     await sendConfirmationSMS(phone, confirmationMessage);

//     // Hash the password
//     const hashedpassword = bcrypt.hashSync(password, Number(process.env.SALT));

//     // Create the user
//     const user = await UserModel.create({
//         name,
//         countryCode,
//         phone,
//         password: hashedpassword,
//     });

//     // Create the user profile
//     const userProfile = await UserProfileModel.create({});

//     // Update the user with the new profile ID
//     await UserModel.findByIdAndUpdate(user._id, { $push: { profile: userProfile._id } });

//     res.status(201).json({ message: 'Signed up successfully ..' });
// });




export const signUp =catchAsyncError( async (req, res, next)=> {
    // destruct data from req.body
    const {
        name,
        email,
        password,
        phoneNumber,
        role
    } = req.body
    // check if email already exists
    const isEmailExist = await UserModel.findOne({email})
    if(isEmailExist){
        throw new AppError('mail is already exists, Please try another email', 409);
    }
    // check if phoneNumber already exists
    const isPhoneExist = await UserModel.findOne({phoneNumber})
    if(isPhoneExist){
        throw new AppError('Phone number is already exists, Please try another phone number', 409);
    }
    // password hashing
    const hashedPassword = bcrypt.hashSync(password, +process.env.SALT)
    // create new document in database
    const newUser = await UserModel.create({
        name,
        email,
        password: hashedPassword,
        phoneNumber,
        role
    })
    if(!newUser) {
        throw new AppError('An error occurred while creating user', 500);
    }
    // generate otp
    const activateCode = Math.floor(1000 + Math.random() * 9000).toString();
    newUser.accountActivateCode = crypto
        .createHash("sha256")
        .update(activateCode)
        .digest("hex")
    newUser.accountActivateExpires = Date.now() + 10 * 60 * 1000;
    
    await sendEmailService({
        to: email,
        subject: "Verification Code (valid for 10 minutes)",
        message: `Hi ${newUser.name},\nYour verification code is ${activateCode}.
        \nEnter this code to access our app to activate your  account.`
        
    })
    
    // Save user
    await newUser.save();
    // send response
    res.status(201).json({
        msg: "User created successfully, Please check your email to verify your account",
        statusCode: 201,
    })
})
export const verifyEmail = async (req, res, next)=> {
    const { activateCode, email } = req.body
    // find user by email
    const user = await UserModel.findOne({email})
    if(!user){
        return next (new Error("User not found", { cause: 404 }))
    }
    // verify otp
    const hashedResetCode = crypto
    .createHash("sha256")
    .update(activateCode)
    .digest("hex");
    // check if otp is valid
    if(user.accountActivateCode !== hashedResetCode || user.accountActivateExpires <= Date.now()){
        return next (new Error("Invalid verification code or expired", { cause: 404 }))
    }
    // update user
    user.accountActive = true;
    user.accountActivateCode = undefined;
    user.accountActivateExpires = undefined;
    await user.save();
    // generate token
    const userToken = jwt.sign({ id: user._id ,email , name: user.name, role: user.role},
        process.env.SECRET,
        {
            
            expiresIn: "90d"
        }
    )
    // send response
    res.status(200).json({
        msg: "Account verified successfully",
        statusCode: 200,
        userToken
    })
}

export const verifyCode = async (req, res, next) => {
    // destruct data from req.body
    const { resetCode, email } = req.body;
    // hash reset code
    const hashedResetCode = crypto
        .createHash("sha256")
        .update(resetCode)
        .digest("hex");
    // check if user exists
    const user = await User.findOne({email})
    if (!user) {
        return next(new Error("User not found", { cause: 404 }));
    }
    if (user.passwordResetCode !== hashedResetCode || user.passwordResetExpires <= Date.now()) {
        return next(new Error("Invalid verification code or expired", { cause: 404 }));
    }

    user.passwordResetVerified = true;
    await user.save();

    return res.status(200).json({
        msg: "Code verified successfully",
        statusCode: 200
    });
}

const logout = catchAsyncError(async (req, res) => {
    const token = req.header('token')

    if (!token) {
        throw new AppError('No token provided', 400);
    }

    // Verify and decode the token
    const decoded = jwt.verify(token, process.env.SECRET);

    // Log the decoded token to check its content
    console.log('Decoded token:', decoded);

    // Ensure the exp field is present and valid
    if (!decoded.exp) {
        throw new AppError('Invalid token, no expiration time', 400);
    }

    const expirationTime = new Date(decoded.exp * 1000);

    // Log the expiration time to check its value
    console.log('Expiration time:', expirationTime);

    if (isNaN(expirationTime)) {
        throw new AppError('Invalid expiration time', 400);
    }

    await TokenBlacklistModel.create({
        token,
        expiresAt: expirationTime
    });

    res.status(200).json({ message: 'Logged out successfully ..' });
});

export {
    signin,
    // signup,
    logout,
}