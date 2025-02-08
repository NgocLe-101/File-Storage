import bcrypt from 'bcryptjs';
import UserModel from './user.model.js';
import CONFIG from "../constants.js"

const verifyPassword = async (password, hashPassword) => {
    return await bcrypt.compare(password, hashPassword);
}

const validateFields = async (email, password) => {
    if (!email || !password) {
        return {
            success: false,
            message: "Email and password are required"
        }
    }

    if (!CONFIG.AUTH.PW_PATTERN.test(password)) {
        return {
            success: false,
            message: "Password must contain at least 8 characters, one uppercase letter, one lowercase letter, and one number"
        }
    }
    try {
        const user = await UserModel.findByEmail(email);
        if (user) {
            return {
                success: false,
                message: "Email already exists"
            }
        }
        
        return {
            success: true
        }
    } catch (err) {
        return {
            success: false,
            message: err.message
        }
    }
}


export default {
    verifyPassword,
    validateFields
};