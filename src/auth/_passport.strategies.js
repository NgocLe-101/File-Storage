import LocalStrategy from "passport-local";

import UserModel from "./user.model.js";
import authService from "./auth.service.js";

const localStrategy = new LocalStrategy({
    usernameField: "email",
    passwordField: "password"
}, async (email, password, done) => {
    try {
        const user = await UserModel.findByEmail(email);
        if (!user) {
            return done(null, false, { message: "Incorrect email" });
        }
        if (await authService.verifyPassword(password, user.password) === false) {
            return done(null, false, { message: "Incorrect password" });
        }
        return done(null, user);
    } catch(err) {
        return done(err);
    }
})

export {
    localStrategy
};