import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is require"],
    },
    rating: {
      type: Number,
      default: 0,
    },
    comment: {
      type: String,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "user require"],
    },
  },
  { timestamps: true }
);


const StylistSchema = new mongoose.Schema({
  name: { type: String, required: true },
  experience: { type: String, required: true },
  expertise: { type: String, required: true },
  about: { type: String, required: true },
  dateTimeSlots: [
    {
      date: { type: String, required: true },
      times: [{ type: String, required: true }],
    },
  ],
});

const ServiceOptionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
});

const ServiceSchema = new mongoose.Schema({
  type: { type: String, required: true },
  options: { type: [ServiceOptionSchema], required: true },
});

const SalonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  reviews: [reviewSchema],
  rating: {
    type: Number,
    default: 0,
  },
  numReviews: {
    type: Number,
    default: 0,
  },
  description: { type: String, required: true },
  images: { type: [String], required: true },
  coverImage: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  location: {
    latitude: { type: String, required: true },
    longitude: { type: String, required: true },
  },
  salonType: {
    type: [String],
    required: true,
  },
  about: { type: String, required: true },
  stylists: { type: [StylistSchema], required: true },
  services: { type: [ServiceSchema], required: true },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BusinessUser", // Reference to the BusinessUser model
    required: true, // Ensures each salon is associated with a user
  },
});

export default mongoose.model("Salon", SalonSchema);
