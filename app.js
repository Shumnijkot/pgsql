import express from "express";
import session from "express-session";

import bodyParser from "body-parser";

import products from "./routes/products.js";
import users from "./routes/users.js";

const app = express();
app.use(session({
    secret: "cats-park-101",
    cookie: { someCookie: "one" },
    proxy: true,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req,res,next)=>{
})

app.get("/api", (req, res, next) =>{
    res.send("Not implemented");
});
app.use("/api/products", products);
app.use("/api/users", users);

export default app;