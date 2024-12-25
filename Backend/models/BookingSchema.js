import mongoose from 'mongoose';

const BookingSchema = new mongoose.Schema({
  salonId: {
    type: String, // Change ObjectId to String
   
  },
  selectedServices: [
    {
      serviceName: {
        type: String,
        required: true,
      },
      price: {
        type: String,
        required: true,
      },
    },
  ],
  selectedStylist: {
    stylistName: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
    },
    expertise: {
      type: String,
    },
  },
  selectedDate: {
    type: String, // Date as a string (e.g., "2024-10-06")
    required: true,
  },
  selectedTime: {
    type: String, // Time as a string (e.g., "04:00 PM")
    required: true,
  },
  customerFirstName: {
    type: String,
    
  },
  customerLastName: {
    type: String,
    
  },
  customerPhoneNumber: {
    type: String,
    
  },
  customerEmail: {
    type: String,
    
  },
 
}, { timestamps: true });

export const Booking = mongoose.model('Booking', BookingSchema);
