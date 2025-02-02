import express from "express"
import dotenv from "dotenv";
dotenv.config();

import prisma from "./config/db.config.js";
import passport from "./config/passport.config.js";
import sessionConfig from "./config/session.config.js";
import routes from "./src/routes.js";

const app = express();
const port = process.env.PORT || 8000;

// Configuration
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(express.static("views"));
app.set("view engine", "ejs");
app.use(
    sessionConfig
)

app.use(passport.initialize());
app.use(passport.session());

app.use(routes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

try {
    await prisma.$disconnect();
} catch (err) {
    console.error(err);
    await prisma.$disconnect();
    process.exit(1);
}