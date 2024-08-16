import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({


    name: {
        type: String,
        required: true


    },
    email: {
        type: String,
        required: true


    },
    phone: {
        type: String,
     

    },
    password: {
        type: String,
        required: true,



    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserProfile'
    },
   

    role: {
        type: String,
        enum: ['ADMIN', 'USER'], // Validate role against predefined set of roles
        default: 'user', // Default role if none is specified
    },
    accountActivateCode: String,
    accountActivateExpires: Date,
    accountActive: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt: Date,
    passwordResetCode: String,
    passwordResetExpires: Date,
    passwordResetVerified: Boolean,



})

const UserModel = mongoose.model('User', UserSchema)


export default UserModel