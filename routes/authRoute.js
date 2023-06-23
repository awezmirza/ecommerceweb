import express from "express";
import { registerController, loginController, testController, forgotpasswordController } from '../controllers/authController.js'
import { isAdmin, requireSignIn } from "../middlewares/authMiddleware.js";

const router = express.Router()

router.post('/register', registerController)

// For Login
router.post('/login', loginController)

//Forgot Pass
router.post('/forgot-password', forgotpasswordController)

// Test 
router.get('/test', requireSignIn, isAdmin, testController)

// Protected user Route 
router.get("/user-auth", requireSignIn, (req, res) => {
    res.status(200).send({ ok: true })
})

// Protected Admin Route 
router.get("/admin-auth", requireSignIn, isAdmin, (req, res) => {
    res.status(200).send({ ok: true })
})


export default router