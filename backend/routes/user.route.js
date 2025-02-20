import express from "express";
import { login, logout, register } from "../Controllers/user.controller.js";
import { initiateOtp } from "../Controllers/otp.controller.js";
import {storeTransaction} from "../Controllers/transaction.controller.js"
const router = express.Router();

// Registration and Login Routes
router.route('/register').post(register);
router.route('/login').post(login);
router.route('/logout').get(logout);

// OTP Routes
router.route('/send-otp').post(initiateOtp);
//transaction Routes
router.route('/transaction').get(storeTransaction);
export default router;
