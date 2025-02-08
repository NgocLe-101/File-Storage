import passport from "passport";
import UserModel from "../src/auth/user.model.js";
import { localStrategy } from "../src/auth/_passport.strategies.js";

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await UserModel.findById(id);
        done(null, user);
    } catch(err) {
        done(err);
    }
});

passport.use(localStrategy);

export default passport;