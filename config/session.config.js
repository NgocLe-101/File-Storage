import session from "express-session";
import { PrismaSessionStore } from "@quixo3/prisma-session-store";
import prisma from "./db.config.js";
import dotenv from "dotenv";
dotenv.config();

const CONFIG = {
    cookie_max_age: 30 * 24 * 60 * 60 * 1000,
}

export default session({
    cookie: {
        maxAge: CONFIG.cookie_max_age
    },
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    store: new PrismaSessionStore(
        prisma,
        {
            checkPeriod: 2 * 60 * 1000,
            dbRecordIdIsSessionId: true,
            dbRecordIdFunction: undefined,
        }
    )
});