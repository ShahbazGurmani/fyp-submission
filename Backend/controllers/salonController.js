import mongoose from "mongoose";
import Salon from "../models/createSalonModel.js";  // Adjust the model path as per your project structure
import BusinessUser from "../models/salonAuthModel.js";  // Adjust the model path

// Function to add a salon with type specified in the request body
export const createSalonProfile = async (req, res) => {
  try {
    const {
      name,
     
      description,
      city,
      address,
      latitude,
      longitude,
      salonType,
      fillheart,
      about,
      stylists,
      services,
    } = req.body;

    // Validate required fields
    if (!name || !salonType || !services) {
      return res.status(400).json({
        message: "name, salonType, and services are required.",
      });
    }

    // Handle uploaded files (coverImage and galleryImages)
    const coverImage = req.files?.coverImage
      ? `/uploads/${req.files.coverImage[0].filename}`
      : null;

    const images = req.files?.images
      ? req.files.images.map((file) => `/uploads/${file.filename}`)
      : [];

    // Create a new salon document
    const newSalon = new Salon({
      name,
      
      description,
      coverImage,
      images,
      address,
      city,
      location: { latitude, longitude },
      salonType: Array.isArray(salonType) ? salonType : [salonType], // Ensure array
      fillheart: fillheart || false,
      about,
      stylists: stylists ? JSON.parse(stylists) : [], // Parse stylists JSON
      services: services ? JSON.parse(services) : [], // Parse services JSON
      user: req.user._id,
    });

    // Save the salon to the database
    await newSalon.save();

    // Return a success response
    res.status(201).json({
      message: "Salon added successfully",
      salon: newSalon,
    });
  } catch (error) {
    console.error("Error adding salon:", error);
    res.status(500).json({
      message: "Server error while adding salon",
      error,
    });
  }
};

export const viewSalonProfile = async (req, resp) => {
  try {
    const userId = req.params.id;
    const salonProfile = await Salon.findOne({ user: userId }).populate(
      "user",
      "-password"
    );
    if (!salonProfile) {
      return resp.status(404).send({
        success: false,
        message: "Salon profile not found for this user",
      });
    }

    resp.status(200).send({
      success: true,
      message: "Getting Data Successfully",
      salonProfile,
    });
  } catch (err) {
    console.log("Error in viewSalonProfile:", err);
    resp.status(500).send({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};

//edit salon salon data 

export const editSalonProfile = async (req, resp) => {
  try {
    const userId = req.params.id;
    const salonProfile = await Salon.findOne({ user: userId }).populate(
      "user",
      "-password"
    );
    if (!salonProfile) {
      return resp.status(404).send({
        success: false,
        message: "Salon profile not found for this user",
      });
    }

    resp.status(200).send({
      success: true,
      message: "Getting Data Successfully",
      salonProfile,
    });
  } catch (err) {
    console.log("Error in editSalonProfile:", err);
    resp.status(500).send({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};


export const updateSalonProfile = async (req, res) => {
  try {
    const userId = req.params.id;

    // Find the salon profile by user ID
    const salonProfile = await Salon.findOne({ user: userId });
    if (!salonProfile) {
      return res.status(404).json({
        success: false,
        message: "Salon profile not found for this user",
      });
    }

    // Extract data from request body
    const {
      name,
      description,
      city,
      address,
      latitude,
      longitude,
      salonType,
      about,
      stylists,
      services,
    } = req.body;

    // Handle uploaded files (coverImage and galleryImages)
    if (req.files?.coverImage) {
      const coverImage = `/uploads/${req.files.coverImage[0].filename}`;
      salonProfile.coverImage = coverImage;
    }

    if (req.files?.images) {
      const images = req.files.images.map((file) => `/uploads/${file.filename}`);
      salonProfile.images = images;
    }

    // Update fields if provided
    if (name) salonProfile.name = name;
    if (description) salonProfile.description = description;
    if (city) salonProfile.city = city;
    if (address) salonProfile.address = address;
    if (latitude) salonProfile.location.latitude = latitude;
    if (longitude) salonProfile.location.longitude = longitude;
    if (salonType) salonProfile.salonType = Array.isArray(salonType) ? salonType : [salonType];
    if (about) salonProfile.about = about;

    try {
      if (stylists) {
        salonProfile.stylists =
          typeof stylists === "string" ? JSON.parse(stylists) : stylists;
        if (!Array.isArray(salonProfile.stylists)) {
          throw new Error("Stylists must be an array");
        }
      }
      if (services) {
        salonProfile.services =
          typeof services === "string" ? JSON.parse(services) : services;
        if (!Array.isArray(salonProfile.services)) {
          throw new Error("Services must be an array");
        }
      }
    } catch (parseError) {
      console.error("Error parsing stylists or services:", parseError.message);
      return res.status(400).json({
        success: false,
        message: "Invalid format for stylists or services",
        error: parseError.message,
      });
    }
    
    

    // Save the updated salon profile
    await salonProfile.save();

    // Success response
    res.status(200).json({
      success: true,
      message: "Salon profile updated successfully",
      salonProfile,
    });
  } catch (error) {
    console.error("Error updating salon profile:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating salon profile",
      error: error.message,
    });
  }
};




// Function to delete salon profile and the corresponding user from BusinessUser model
export const deleteSalonProfile = async (req, resp) => {
  try {
    const userId = req.params.id;

    // Find and delete the salon profile
    const salonProfile = await Salon.findOneAndDelete({ user: userId });
    if (!salonProfile) {
      return resp.status(404).send({
        success: false,
        message: "Salon profile not found for this user",
      });
    }

    // Delete the corresponding user from the BusinessUser model
    const businessUser = await BusinessUser.findByIdAndDelete(userId);
    if (!businessUser) {
      return resp.status(404).send({
        success: false,
        message: "Business user not found for this user",
      });
    }

    resp.status(200).send({
      success: true,
      message: "Salon profile and user account deleted successfully",
    });
  } catch (err) {
    console.error("Error in deleteSalonProfile:", err);
    resp.status(500).send({
      success: false,
      message: "Server Error",
      error: err.message,
    });
  }
};









//for getting reviews 
export const reviewController = async (req, res) => {
  try {
    const { comment, rating } = req.body;
    // find product
    const salon = await Salon.findById(req.params.id);
    const user = await userModel.findById(req.user._id)
   console.log(user);
    // check previous review
    const alreadyReviewed = salon.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    if (alreadyReviewed) {
      return res.status(400).send({
        success: false,
        message: "Alredy Reviewed",
      });
    }
    
    const review = {
      name: user.first_name,
      rating: Number(rating),
      comment,
      user: user._id,
    };
    // passing review object to reviews array
    salon.reviews.push(review);
    // number or reviews
    salon.numReviews = salon.reviews.length;
    salon.rating =
      salon.reviews.reduce((acc, item) => item.rating + acc, 0) /
      salon.reviews.length;
    // save
    await salon.save();
    res.status(200).send({
      success: true,
      message: "Review Added!",
    });
  } catch (error) {
    console.log(error);
    // cast error ||  OBJECT ID
    if (error.name === "CastError") {
      return res.status(500).send({
        success: false,
        message: "Invalid Id",
      });
    }
    res.status(500).send({
      success: false,
      message: "Error In Review Comment API",
      error,
    });
  }
};

// Function to get all salons by type
export const getSalonsByType = async (req, res) => {
  try {
    const { salonType } = req.query; // Get the salon type from the query parameters

    // Check if salonType is provided
    if (!salonType) {
      return res.status(400).json({ message: 'salonType query parameter is required.' });
    }

    // Split the salonType into an array if it contains multiple types
    const types = Array.isArray(salonType) ? salonType : [salonType];

    // Fetch salons matching at least one of the types specified in the array
    const salons = await Salon.find({ salonType: { $in: types } });

    // Return a success response with the list of salons
    res.status(200).json(salons);
  } catch (error) {
    // Return an error response in case of a server error
    res.status(500).json({ message: 'Server error while fetching salons', error });
  }
};