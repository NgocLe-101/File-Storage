import prisma from "../../config/db.config.js";

const UserModel = {
    findById: async (id) => {
        return await prisma.user.findUnique({
            where: {
                id: id
            }
        });
    }
}

export default UserModel;