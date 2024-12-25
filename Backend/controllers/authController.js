import { comparePassword, hashpassword } from "../helpers/Helper.js";
import userModel from "../models/authModel.js";
import salonOwnerModel from "../models/salonAuthModel.js";
import JWT from "jsonwebtoken";
export const registerController = async (req, resp) => {
  try {
    const { first_name, last_name, email, phone_number, password } = req.body;

    //validation
    if (!first_name) {
      return resp.send({ error: "First Name Is Required " });
    }
    if (!last_name) {
      return resp.send({ error: "Last Name Is Required " });
    }
    if (!email) {
      return resp.send({ error: "Email Is Required " });
    }
    if (!phone_number) {
      return resp.send({ error: "Phone Nummber Is Required " });
    }
    if (!password) {
      return resp.send({ error: "Password Is Required " });
    }

    //condition for existing user
    const existUser = await userModel.findOne({ email });
    if (existUser) {
      return resp.status(200).send({
        success: false,
        message: "User Already Exist Please Login ",
      });
    }

    //hash Password
    const hashedPassword = await hashpassword(password);

    //save user info
    const user = await new userModel({
      first_name,
      last_name,
      email,
      phone_number,
      password: hashedPassword,
    }).save();

    resp.status(201).send({
      success: true,
      message: "User Register Successfully ",
      user,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      success: false,
      message: "Internal Server Error",
      err,
    });
  }
};

// Salon Owner Registration Controller
export const salonRegisterController = async (req, resp) => {
  try {
    // Destructure the fields from the request body
    const {
      salonName,
      phoneNumber,
      streetAddress,
      postalCode,
      city,
      firstName,
      lastName,
      email,
      password,
    } = req.body;

    // Validate required fields (this can also be handled in schema validations)
    if (!salonName)
      return resp.status(400).json({ error: "Salon Name is Required" });
    if (!phoneNumber)
      return resp.status(400).json({ error: "Phone Number is Required" });
    if (!streetAddress)
      return resp.status(400).json({ error: "Street Address is Required" });
    if (!postalCode)
      return resp.status(400).json({ error: "Postal Code is Required" });
    if (!city) return resp.status(400).json({ error: "City Name is Required" });
    if (!firstName)
      return resp.status(400).json({ error: "First Name is Required" });
    if (!lastName)
      return resp.status(400).json({ error: "Last Name is Required" });
    if (!email) return resp.status(400).json({ error: "Email is Required" });
    if (!password)
      return resp.status(400).json({ error: "Password is Required" });

    // Check if the email already exists in the BusinessUser model (salon owners)
    const existingBusinessUser = await salonOwnerModel.findOne({ email });
    if (existingBusinessUser) {
      return resp.status(400).json({
        message: "Email is already registered as a business owner.Please Login",
      });
    }

    // Check if the email exists in the User model (regular users)
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // Delete the user from the User model
      await userModel.deleteOne({ email });
      console.log(`Deleted user with email ${email} from User model`);
    }

    // Hash the password before saving
    const hashedPassword = await hashpassword(password);
    // Create new salon owner
    const newSalonOwner = new salonOwnerModel({
      salonName,
      phoneNumber,
      streetAddress,
      postalCode,
      city,
      firstName,
      lastName,
      email,
      password: hashedPassword, // Store hashed password
    });

    // Save the new salon owner to the database
    await newSalonOwner.save();

    // Return success response
    resp.status(201).json({
      message: "Salon owner registered successfully.",
      newSalonOwner,
    });
  } catch (error) {
    console.error("Error registering salon owner:", error);
    resp.status(500).json({ message: "Internal server error" });
  }
};

//api for login
// Login Controller
export const loginController = async (req, resp) => {
  try {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
      return resp.status(400).send({
        success: false,
        message: "Email and password are required.",
      });
    }

    // Step 1: Try to find the user in the userModel (regular users)
    let user = await userModel.findOne({ email });

    // Step 2: If not found in userModel, try to find the email in salonModel (salon owners)
    let isBusinessUser = false;
    if (!user) {
      user = await salonOwnerModel.findOne({ email });
      isBusinessUser = !!user; // Set flag if email found in salonModel
    }

    // Step 3: If the email is not found in either model
    if (!user) {
      return resp.status(404).send({
        success: false,
        message: "Email is not registered. Please SignUp.",
      });
    }

    // Step 4: Compare the password with the hashed password in the database
    const matchPassword = await comparePassword(password, user.password);
    if (!matchPassword) {
      return resp.status(401).send({
        success: false,
        message: "Invalid password",
      });
    }

    // Step 5: Assign JWT Token with user id and role (role can be used for further authorization)
    const token = JWT.sign(
      { _id: user._id, role: user.role },
      process.env.JWT_KEY,
      {
        expiresIn: "7d",
      }
    );

    // Step 6: Return a response with user data based on type of user (regular or business)
    resp.status(200).send({
      success: true,
      message: "Login Successful",
      user: {
        _id: user._id,
        first_name: user.first_name || user.firstName, // Handling different field names for first name
        last_name: user.last_name || user.lastName, // Handling different field names for last name
        email: user.email,
        phone_number: user.phone_number || user.phoneNumber, // Handling different field names for phone number
        role: user.role,
        isBusinessUser: isBusinessUser, // Flag to indicate if the user is a salon owner
        salonName: isBusinessUser ? user.salonName : null, // Add salon-specific fields if business user
        streetAddress: isBusinessUser ? user.streetAddress : null,
        postalCode: isBusinessUser ? user.postalCode : null,
        city: isBusinessUser ? user.city : null,
      },
      token,
    });
  } catch (err) {
    console.log(err);
    resp.status(500).send({
      message: "Internal Servver Error",
    });
  }
};

//cahnge password
export const changePassword = async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    // Find user by email
    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Email does not exist.",
      });
    }

    // Check if the new password is the same as the old one
    const matchPassword = await comparePassword(newPassword, user.password);
    if (matchPassword) {
      return res.status(400).send({
        success: false,
        message: "New password cannot be the same as the old password.",
      });
    }

    // Hash the new password
    const hashedPassword = await hashpassword(newPassword);

    // Update the user's password in the database
    user.password = hashedPassword;
    await user.save();

    // Send success response
    return res.status(200).send({
      success: true,
      message: "Password updated successfully.",
    });
    
  } catch (error) {
    console.error("Error changing password:", error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};