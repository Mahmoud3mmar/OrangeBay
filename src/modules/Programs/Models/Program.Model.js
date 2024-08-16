import mongoose from "mongoose";

const ProgramSchema = new mongoose.Schema(
  {
    overview: {
      duration: { type: String, required: true },
      city: { type: String, required: true },
      description: { type: String, required: true },
    },
    schedule: [
      {
        time: { type: String, required: true },
        activity: { type: String, required: true },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        rating: { type: Number, min: 1, max: 5, default: 0 }, // Rating out of 5
        comment: { type: String, default: "" },
        date: { type: Date, default: 0 }, // Date of the review
      },
    ],
    images: [
      {
        url: { type: String, required: true },
        public_id: { type: String, required: true },
      },
    ],

    // Ticket prices for adults and children
    ticketPriceAdult: { type: Number, required: true },
    ticketPriceChild: { type: Number, required: true },
  },
  { timestamps: true }
);
const ProgramModel = mongoose.model("Program", ProgramSchema);

export default ProgramModel;
