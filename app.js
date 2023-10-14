import express, { urlencoded } from 'express';
import dotenv from 'dotenv';
import { connectPassport } from './utils/provider.js';
import session from 'express-session';
import passport from 'passport';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { errorMiddleware } from './middlewares/errorMiddleware.js';

const app = express();
export default app;

dotenv.config({
    path: './configs/config.env'
})
// using middlewares
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,

        cookie: {
            secure: process.env.NODE_ENV === "development" ? false : true,
            httpOnly: process.env.NODE_ENV === "development" ? false : true,
            sameSite: process.env.NODE_ENV === "development" ? false : "none",
        },
    })
);
app.use(cookieParser());
app.use(express.json());
app.use(urlencoded({
    extended: true
}))
app.use(
    cors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: ["GET", "POST", "PUT", "DELETE"],
    })
);
app.use(passport.authenticate('session'));
app.use(passport.initialize());
app.use(passport.session());
app.enable("trust proxy");

connectPassport();
import userRoute from './routes/user.js'
app.use('/api/v1', userRoute);
import orderRoute from './routes/order.js'
app.use('/api/v1', orderRoute);


// using error handling middleware
app.use(errorMiddleware);