import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    program: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Program",
      required: true,
    },
    bookingDate: {
      type: Date,
      default: Date.now,
    },
    tickets: {
      adults: {
        type: Number,
        default: 0,
      },
      children: {
        type: Number,
        default: 0,
      },
    },
    additionalServices: [
      {
        type: String,
      },
    ],
    totalSummary: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const BookingModel = mongoose.model("Booking", BookingSchema);

export default BookingModel;
