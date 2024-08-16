import { AppError, catchAsyncError } from "../../../utils/error.handler.js";

const CreateProgram = catchAsyncError(async (req, res) => {
  const { overview, schedule, reviews, images } = req.body;

  // Validate that required fields are present
  if (!overview || !schedule || !images) {
    throw new AppError("All fields are required", 400);
  }

  // Handle image upload if a file is provided
  if (req.file) {
    const NewProgram = await ProgramModel.create({
      overview,
      schedule,
      images: {
        url: req.file.path,
        public_id: req.file.filename,
      },
    });

    cloudinary.uploader.upload(NewProgram.images.url, {
      use_filename: true,
    });
  }

  res
    .status(201)
    .json({ message: "Program Added successfully ..", NewProgram });
});
// Get all programs with sorting and pagination
const getAllProgramsSorted = catchAsyncError(async (req, res) => {
  const { page = 1, limit = 10 } = req.query; // Default to page 1 and limit 10 if not provided
  const skip = (page - 1) * limit;

  // Ensure page and limit are integers
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Fetch programs with sorting and pagination
  const programs = await ProgramModel.find()
    .sort({ rating: -1 }) // Sort by rating in descending order
    .skip(skip) // Skip the number of items based on pagination
    .limit(limitNumber) // Limit the number of items returned
    .populate("images"); // Populate images if they are stored in a separate collection

  return res.json(programs);
});
const UpdateProgram = catchAsyncError(async (req, res) => {
  const { id } = req.params;
  const { overview, schedule } = req.body;

  // Validate that required fields are present
  if (!overview || !schedule) {
    throw new AppError("Overview, schedule are required", 400);
  }

  // Find the existing program
  const program = await ProgramModel.findById(id);
  if (!program) {
    throw new AppError("Program not found", 404);
  }

  

  // Update the program details
  const updatedProgram = await ProgramModel.findByIdAndUpdate(
    id,
    overview,
    schedule,
    { new: true }
  ); // Return the updated document

  res
    .status(200)
    .json({ message: "Program updated successfully", updatedProgram });
});
const DeleteProgram = catchAsyncError(async (req, res) => {
    const { id } = req.params;
  
    // Find the program by ID
    const program = await ProgramModel.findById(id);
    if (!program) {
      throw new AppError("Program not found", 404);
    }
  
    // Delete associated images from Cloudinary if they exist
    if (program.images && program.images.public_id) {
      await cloudinary.uploader.destroy(program.images.public_id);
    }
  
    // Delete the program from the database
    await ProgramModel.findByIdAndDelete(id);
  
    res.status(200).json({ message: "Program deleted successfully" });
  });


export { CreateProgram, getAllProgramsSorted ,UpdateProgram,DeleteProgram};
