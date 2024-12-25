import express from "express";
import {
  registerController,
  loginController,
  salonRegisterController,
  changePassword
} from "../controllers/authController.js";
import {
  isAdmin,
  isSalonOwner,
  requireSignIn,
} from "../middlewares/authMiddlewares.js";
//Router object
const router = express.Router();

//Sign Up Route || Method POST
router.post("/register", registerController);

//Sign Up Route || Method POST
router.post("/login", loginController);

//salonOwner Auth || Method Post
router.post("/business/admin/register", salonRegisterController);

//proteted route on user token base
router.get("/user-auth", requireSignIn, (req, resp) => {
  resp.status(200).send({
    ok: true,
  });
});

//proteted route on admin
router.get("/admin-auth", requireSignIn, isAdmin, (req, resp) => {
  resp.status(200).send({
    ok: true,
  });
});

//proteted route on salon
router.get("/salon-auth", requireSignIn, isSalonOwner, (req, resp) => {
  resp.status(200).send({
    ok: true,
  });
});

router.post("/changePassword", changePassword);
export default router;
