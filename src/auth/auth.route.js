import express from "express";
const router = express.Router();
import { getLogin, getRegister, logout, postLogin, postRegister } from "./auth.controller.js";

router.get("/login",getLogin);
router.get("/register",getRegister);
router.post("/login", postLogin);
router.post("/register", postRegister);

router.post('/logout', logout);

export default router;