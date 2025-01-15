import express from "express";
import {
  isAdmin,
  isSalonOwner,
  requireSignIn,
  authenticateUser,
  requireSignInForReviews
} from "../middlewares/authMiddlewares.js";
import salonPicsUpload from "../middlewares/imagesMiddleWare.js";
import {
  createSalonProfile,
  viewSalonProfile,
  editSalonProfile,
  updateSalonProfile,
  reviewController,
  deleteSalonProfile
  
} from "../controllers/salonController.js";
const router = express.Router();
// Route to add a salon with images
router.post(
  "/create-salon-profile",
  salonPicsUpload,
  authenticateUser,
  createSalonProfile,
  
);

//route for getting Salon  data
router.get("/view-salon/:id", viewSalonProfile);

//route for edit Salon  data
router.get("/edit-salon/:id", editSalonProfile);
router.put(
  "/update-salon-profile/:id",
  authenticateUser, // Ensure the user is authenticated
  isSalonOwner, // Ensure the user owns the salon
  salonPicsUpload, // Handles file uploads
  updateSalonProfile
);


//route for delete Salon  
router.delete("/delete-salon/:id", deleteSalonProfile);

//for reviews
router.put("/:id/review",requireSignInForReviews, reviewController);
export default router;
