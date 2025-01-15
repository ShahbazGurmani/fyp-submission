import express from "express";
import {

  
  confirmPaymentAndCreateBooking,
  createPaymentIntent,
  ShowSalonAppointments
  
} from "../controllers/Booking.js";

const router = express.Router();
// router.post("/checkout", Checkout);
// router.post("/confirm", confirmBooking);
router.post("/create-payment-intent", createPaymentIntent);
router.post("/create-booking", confirmPaymentAndCreateBooking);
// router.get("/allbookings", AllBookings);
// router.post("/create-payment-intent", Checkout);
// router.post("/confirm", confirmBooking);

router.get("/salon-appointments/:id", ShowSalonAppointments);
export default router;
