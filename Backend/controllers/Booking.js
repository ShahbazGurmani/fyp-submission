import Stripe from "stripe";
import { Booking } from "../models/BookingSchema.js";
import UserAppointments from '../models/userBooking.js';
import mongoose from "mongoose";

const stripe = new Stripe("sk_test_51PIFiAFdq3SMwAKa5PSG4mWWwsyVJap6XCXFhv6ofUwAjZWXUPn6IS5uKPtmgrndnDNKSCGJvov1mEZtaOk6GPdh00dnsTmIuQ");

// Helper function to calculate total price from selected services
const calculateTotalPrice = (selectedServices) => {
  return selectedServices.reduce((total, serviceObj) => {
    const priceString = serviceObj.price; 
    return total + (priceString ? parseFloat(priceString) : 0);
  }, 0) ; // Convert to cents
};

// Function to create a new booking
const createBooking = async (bookingData) => {
  const booking = new Booking(bookingData);
  await booking.save();
  return booking;
};

// Checkout endpoint
export const createPaymentIntent = async (req, res) => {
  try {
    const { amount, salonName, selectedStylist, selectedDate, selectedTime, customerEmail, customerFirstName, customerLastName, customerPhoneNumber, selectedServices } = req.body;

    // Log the incoming data for debugging
    console.log("Received data:", {
      amount,
      salonName,
      selectedStylist,
      selectedDate,
      selectedTime,
      customerEmail,
      customerFirstName,
      customerLastName,
      customerPhoneNumber,
      selectedServices,
    });


    // Create the payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const clientSecret = paymentIntent.client_secret;
     
    // Respond with the client secret
    res.json({ clientSecret });
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};

export const confirmPaymentAndCreateBooking = async (req, res) => {
  try {
    const {
      paymentIntentId,
      salonName,
      selectedStylist,
      selectedDate,
      selectedTime,
      customerEmail,
      selectedServices
    } = req.body;

    if (!selectedStylist.stylistName || !selectedServices || selectedServices.length === 0) {
      return res.status(400).json({ error: "Required booking data is missing" });
    }

    // Confirm the payment intent
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
      console.log(paymentIntent);
    // Check if the payment was successful
    if (paymentIntent.status === 'succeeded') {
      // Prepare booking data
      const bookingData = {
        salonName,
        selectedServices,
        selectedStylist,
        selectedDate,
        selectedTime,
        customerEmail,
      };

      // Create the booking
      const newBooking = await createBooking(bookingData);
      console.log("Booking created:", newBooking);

      // Respond with success
      res.json({ success: true, booking: newBooking });
    } else {
      res.status(400).json({ error: 'Payment not successful' });
    }
  } catch (error) {
    console.log(error);
    res.json({ error: error.message });
  }
};


//show all appointments



 // Ensure you have the Salon model imported






 export const ShowSalonAppointments = async (req, res) => {
  try {
    // Extract the salon ID from the request parameters
    const salonId = req.params.id;

    // Find all user bookings where the salon object's _id matches the provided salonId
    // Populate the user details based on user_id
    const appointments = await UserAppointments.find({ 'salon._id': salonId })
      .populate('user_id', '-password'); // Exclude password for security

    // If no appointments are found, respond accordingly
    if (!appointments.length) {
      return res.status(404).json({ message: 'No appointments found for this salon.' });
    }

    // Return the list of appointments with user details
    res.status(200).json({
      success: true,
      message: 'Appointments retrieved successfully',
      appointments
    });
  } catch (error) {
    console.error("Error retrieving salon appointments:", error);
    res.status(500).json({ message: 'An error occurred while fetching the appointments.' });
  }
};


 
 