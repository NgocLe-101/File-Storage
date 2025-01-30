import passport from "passport";
import UserModel from "../src/auth/user.model.js";

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

export default passport;