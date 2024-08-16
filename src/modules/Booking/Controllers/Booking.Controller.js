import { AppError, catchAsyncError } from "../../../utils/error.handler.js";
import CouponModel from "../../Coupon/Models/Coupon.Model.js";
import RoomModel from "../../Room/Models/Room.Model.js";
import BookingModel from "../Models/Booking.Model.js";



const createBooking = catchAsyncError(async (req, res) => {
    const { programId, tickets, additionalServices } = req.body;
    const userId = req.user.id;

    // Validate that required fields are present
    if (!programId || !tickets) {
      throw new AppError(" Program ID, and tickets are required", 400);
    }
  
    // Check if the program exists
    const program = await ProgramModel.findById(programId);
    if (!program) {
      throw new AppError("Program not found", 404);
    }
  
    // Check if the user exists
    const user = await UserModel.findById(userId);
    if (!user) {
      throw new AppError("User not found", 404);
    }
  
    // Calculate total summary based on ticket prices from the program
    const totalSummary = (tickets.adults * program.ticketPriceAdult) +
                         (tickets.children * program.ticketPriceChild);
  
    // Create and save the booking
    const booking = await BookingModel.create({
      user: userId,
      program: programId,
      tickets,
      additionalServices,
      totalSummary,
    });
  
    res.status(201).json({ message: "Booking created successfully", booking });
});
  




const getUserBookings = catchAsyncError(async (req, res) => {
    const userId = req.user.id;
    const { type } = req.query; // Get the query parameter 'type'
    const currentDate = new Date(); // Get the current date

    let filter;

    if (type === 'past') {
        filter = { userId, date: { $lt: currentDate } };
    } else if (type === 'upcoming') {
        filter = { userId, date: { $gte: currentDate } };
    } else {
        throw new AppError('Invalid type parameter. Use "past" or "upcoming".', 400);
    }

    // Retrieve bookings and sort by date in descending order
    const bookings = await BookingModel.find(filter).sort({ date: -1 }); // -1 for descending order

    res.status(200).json({
        status: 'success',
        message: `User ${type} bookings retrieved successfully`,
        data: {
            bookings
        }
    });
});

export {
    createBooking,
    getUserBookings
};



