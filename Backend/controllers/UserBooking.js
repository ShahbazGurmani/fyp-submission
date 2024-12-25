// controllers/userBookingController.js
import UserBooking from '../models/userBooking.js'; // Import the UserBooking model
import User from '../models/authModel.js'; // Import the User model

// Get Bookings for a User
export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.query; // Retrieve email from the query parameter

    if (!email) {
      return res.status(400).json({ success: false, message: 'Email is required' });
    }

    // Find the user by email to get their ID
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Fetch bookings by user_id from the UserBooking model
    const bookings = await UserBooking.find({ user_id: user._id });

    res.status(200).json({
      success: true,
      bookings: bookings || [], // Return empty array if no bookings found
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};

export const addBooking = async (req, res) => {
  try {
    const { user_id, salonName, salon, selectedServices, selectedStylist, 
            selectedDate, selectedTime, customerEmail, paymentIntentId } = req.body;

    // Check if the user exists
    const user = await User.findById(user_id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    // Create a new booking object
    const newBooking = new UserBooking({
      user_id,
      salonName,
      salon,
      selectedServices,
      selectedStylist,
      selectedDate,
      selectedTime,
      customerEmail,
      paymentIntentId,
    });

    // Save the new booking to the database
    await newBooking.save();

    res.status(201).json({
      success: true,
      message: 'Booking added successfully',
      booking: newBooking,
    });
  } catch (error) {
    console.error('Error adding booking:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error', error });
  }
};
