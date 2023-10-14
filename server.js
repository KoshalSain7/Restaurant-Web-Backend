import app from './app.js';
import { connectDB } from './configs/database.js';
import Razorpay from 'razorpay';

export const instance = new Razorpay({
    key_id: process.env.RAZORPAY_API_KEY,
    key_secret: process.env.RAZORPAY_API_SECRET,
});
connectDB();

app.get("/", (req, res, next) => {
    res.send("<h1>Working</h1>");
});


app.listen(process.env.PORT, () => {
    console.log(`Server Running At PORT:${process.env.PORT} in ${process.env.NODE_ENV} Mode`);
})
