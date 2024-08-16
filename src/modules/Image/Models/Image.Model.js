import mongoose from "mongoose";


const imageSchema = new mongoose.Schema({


    name: String,
    url: String,
    cloudinary_id: String,
    postedby: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }, 
    task: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Task',
    }


})


// imageSchema.post('find', (docs, next) => {
//     docs.forEach(d => (d.path = process.env.BASE_URL + d.path))
//     next()
// })

const imageModel = mongoose.model('image', imageSchema)


export default imageModel