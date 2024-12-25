import express from 'express'
import { forgotPassword,verifyOtp } from '../controllers/forgotPasswordController.js'
const router = express.Router();

router.post('/forgotPassword',forgotPassword);
router.post('/verifyOtp',verifyOtp)

export default router;