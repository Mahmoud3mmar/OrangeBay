// import { cloudinary } from "../../../utils/Cloudinary.config.js";
// import { catchAsyncError } from "../../../utils/error.handler.js";
// import TaskModel from "../../Task/Models/Task.Model.js";
// import imageModel from "../Models/image.model.js";

// imageModel
// const UploadSingleImage = catchAsyncError(async (req, res) => {


//     const userId = req.user.id
//     const TaskId = req.params.id





//     // Handle image upload if a file is provided
//     if (req.file) {
//         const image = await imageModel.create({
//             name: req.file.originalname,
//             url: req.file.path,
//             postedBy: userId,
//             task: TaskId,
//         });

//         // Update the task with the new image ID    
//         await TaskModel.findByIdAndUpdate(TaskId, { $push: { images: image._id } });
//         cloudinary.uploader
//             .upload(image.url, {
//                 use_filename: true
//             }
//         )


       
//     }
//     res.status(201).json({ message: 'Image Added successfully ..' });

// });

// export {
//     UploadSingleImage
// }