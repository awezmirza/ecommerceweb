import { comparePassword, hashPassword } from "../helpers/authHelper.js"
import userModel from "../models/userModel.js"
import JWT from "jsonwebtoken"

export const registerController = async (req, res) => {
    try {
        const { name, email, password, phone, address, answer } = req.body
        if (!name) {
            return res.send({ message: 'Name is required' })
        }
        if (!email) {
            return res.send({ message: 'email is required' })
        }
        if (!password) {
            return res.send({ message: 'pass is required' })
        }
        if (!phone) {
            return res.send({ message: 'phone is required' })
        }
        if (!address) {
            return res.send({ message: 'address is required' })
        }
        if (!answer) {
            return res.send({ message: 'answer is required' })
        }

        // Check if he is existing user 
        const existingUser = await userModel.findOne({ email })
        if (existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already Registered'
            })
        }

        // Register new user 
        const hashedPassword = await hashPassword(password)
        const user = await new userModel({ name, email, phone, address, answer, password: hashedPassword }).save()

        res.status(201).send({
            success: true,
            message: 'Successfully Registered',
            user
        })


    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "Error in registering",
            error
        })

    }
}

// After login 
export const loginController = async (req, res) => {

    try {
        const { email, password } = req.body

        if (!email || !password) {
            return res.status(410).send({
                success: false,
                message: 'invalid email or pass'
            })
        }

        const user = await userModel.findOne({ email })
        if (!user) {
            return res.status(405).send({
                success: false,
                message: 'Email is unregistered'
            })
        }
        const match = await comparePassword(password, user.password)
        if (!match) {
            return res.status(200).send({
                success: false,
                message: 'invalid pass'
            })
        }
        // Token 
        const token = await JWT.sign({ _id: user._id }, process.env.JWT_Secret, { expiresIn: '7d' })
        res.status(200).send({
            success: true,
            message: 'Login Successful',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            }, token
        })


    } catch (error) {
        console.log(error)
        req.status(500).send({
            success: false,
            message: 'Error in Login',
            error
        })
    }
};

export const forgotpasswordController = async (req, res) => {
    try {
        const { email, answer, newPassword } = req.body
        if (!email) {
            res.status(400).send({ message: "Email is required" })
        }
        if (!answer) {
            res.status(400).send({ message: "Answer is required" })
        }
        if (!newPassword) {
            res.status(400).send({ message: "New Password is required" })
        }
        const user = await userModel.findOne({ email, answer })
        if (!user) {
            return res.status(415).send({ success: false, message: "Wrong Email or Answer" })
        }
        const hashed = await hashPassword(newPassword)
        await userModel.findByIdAndUpdate(user._id, { password: hashed })
        res.status(200).send({ success: true, message: "Password reset successfully" })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: "something went wrong",
            error
        })
    }
}

export const testController = (req, res) => {


    try {
        res.send('protected route')
    } catch (error) {
        res.send({ error })
    }
}
