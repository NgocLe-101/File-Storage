import passport from "passport";
import authService from "./auth.service.js";
import UserModel from "./user.model.js";

export async function getLogin(req, res) {
    const failureMessage = req.session.messages ? req.session.messages.pop() : null;
    res.render("auth/login", { title: "Login", user: req.user, error: failureMessage });
}

export async function getRegister(req, res) {
    res.render("auth/register", { title: "Register", user: req.user, error: req.session.error });
    req.session.error = null;
}

export async function postLogin(req, res, next) {
    passport.authenticate("local", {
        successRedirect: "/",
        failureRedirect: "/auth/login",
        failureMessage: true
    })(req, res, next);
}

export async function postRegister(req, res, next) {
    const { email, password } = req.body;
    const validation = await authService.validateFields(email, password);
    if (!validation.success) {
        req.session.error = validation.message;
        return res.redirect("/auth/register");
    }
    try {
        const user = await UserModel.createUser(email, password);
        req.login(user, (err) => {
            if(err) {
                return next(err);
            }
            res.redirect("/");
        });
    } catch (err) {
        req.session.error = "There was an error creating your account";
        return res.redirect("/auth/register");
    }

}

export async function logout(req, res, next) {
    req.logout((err) => {
        if(err) {
            return next(err);
        }
        res.redirect("/");
    })
}