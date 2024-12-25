// routes/userBooking.js
import express from 'express';
import { addBooking, getUserBookings } from '../controllers/UserBooking.js';

const router = express.Router();

router.post('/add-booking', addBooking);  // Route to add a booking
router.get('/user-bookings', getUserBookings);  // Route to get user bookings
// router.delete('/cancel-booking', cancelBooking);  // Route to cancel a booking

export default router;
