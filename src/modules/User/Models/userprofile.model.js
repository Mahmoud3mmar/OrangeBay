import mongoose from "mongoose";


const UserProfileSchema = new mongoose.Schema({


    level: {
        type: String,
        enum: ['Junior', 'Senior'],
        default: 'Junior'



    }, yearsofexperience: {
        type: Number,
       



    }, location: {
        type: String,
        enum: ['Cairo', 'Alexandria', 'Giza', 'SharmElSheikh', 'Aswan', 'Luxor', 'PortSaid', 'Sohag', 'Tanta'],
        default: 'Cairo'



    }



})

const UserProfileModel= mongoose.model('UserProfile',UserProfileSchema)


export default UserProfileModel