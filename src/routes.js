import express from "express";
const router = express.Router();

import authRouter from "./auth/auth.route.js";
import { ensureAuthenticated } from "./middlewares/auth.middleware.js";

router.use("/auth", authRouter);
router.use("/", ensureAuthenticated ,(req, res) => {
    res.render("index", { title: "Home", user: req.user });
});

export default router;