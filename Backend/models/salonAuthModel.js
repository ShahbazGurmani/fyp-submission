import mongoose from "mongoose";

const salonAuthSchema = new mongoose.Schema(
  {
    salonName: {
      type: String,
      required: [true, "Salon name is required"],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\d{10,15}$/, "Please enter a valid phone number"],
    },
    streetAddress: {
      type: String,
      required: [true, "Street address is required"],
    },
    postalCode: {
      type: Number,
      required: [true, "Postal code is required"],
      validate: {
        validator: function (value) {
          return /^\d{5,6}$/.test(value); // Postal code validation for 5 or 6 digits
        },
        message: "Please enter a valid postal code",
      },
    },
    city: {
      type: String,
      required: [true, "City is required"],
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [/.+@.+\..+/, "Please enter a valid email address"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters long"],
    },
    role: {
      type: Number,
      default: 2, // Assuming '2' refers to salon owner or business user
    },
  },
  { timestamps: true }
);

export default mongoose.model("BusinessUser", salonAuthSchema);
