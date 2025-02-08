import prisma from "../../config/db.config.js";
import bcrypt from "bcryptjs";

const UserModel = {
    findById: async (id) => {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    },

    findByEmail: async (email) => {
        return await prisma.user.findUnique({
            where: {
                email: email
            }
        });
    },

    createUser: async (email, password) => {
        const hashPassword = await bcrypt.hash(password, 10);
        return await prisma.user.create({
            data: {
                email: email,
                password: hashPassword
            }
        });
    }
}

export default UserModel;