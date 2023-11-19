const express = require("express")
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const passport = require("passport")
const JWTStrategy = require('passport-jwt').Strategy
const { ExtractJwt } = require("passport-jwt")
const User = require("./models/User");
const { jwt_secret, errorCodesEnum } = require("./Config")
const { createError } = require("./utils/Helpers")


const app = express()

// Body Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));



/************************************/
// Database connection
const dbName = "shaheen-seeds"
const dbUsername = "amrelmhdy"
const dbPassword = "Il1Xj5OYq8COfgkP"
const dbURL = "mongodb://localhost:27017/"
// mongoose.set('useFindAndModify', false);
mongoose.connect(`${dbURL}${dbName}`);
/************************************/

//handling Cross Origins
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');
    next();
});



// configure passport
const JWT_opts = {}
JWT_opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken()
JWT_opts.secretOrKey = jwt_secret
passport.use(new JWTStrategy(JWT_opts, async (payload, done) => {
    try {
        const user = await User.findOne({ _id: payload.id })
        if (!user) {
            done(null, false)
        }
        done(null, user);
    } catch (err) {
        done(null, false);
    }
}))



// API routes
const user_routes = require("./routes/Auth");
const category_routes = require("./routes/Category");

// Fire API Routes
app.use("/auth/", user_routes);
app.use("/category/", category_routes);

// Handle validation
app.use((err, req, res, next) => {
    if (err && err.error && err.error.isJoi) {
        // we had a joi error, let's return a custom 400 json response
        response = createError(errorCodesEnum.CONFLICT, "Error on validation ... ", err?.error?.details ||{} );
        res.status(200).json(response);
        return;
    } else {
        // pass on to another error handler
        next(err);
    }
});



const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`app is listening to port : ${port}`)
})