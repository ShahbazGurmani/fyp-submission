// models/userBookingModel.js
import mongoose from 'mongoose';

const userBookingSchema = new mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    salonName: String,
    salon: mongoose.Schema.Types.Mixed, // Storing the entire salon object
    selectedServices: Map,
    selectedStylist: {
      name: String,
      id: mongoose.Schema.Types.ObjectId,
    },
    selectedDate: String,
    selectedTime: String,
    customerEmail: String,
    paymentIntentId: String,
    paymentAmount:String,
    status: {
      type: String,
      enum: ['ongoing', 'completed', 'cancelled'],
      default: 'ongoing',
    },
  },
  { timestamps: true }
);

export default mongoose.model('UserBooking', userBookingSchema);
