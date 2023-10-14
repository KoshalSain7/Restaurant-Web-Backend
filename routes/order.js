import express from 'express'
import { getAdminOrders, getMyOrders, getOrderDetails, paymentVerification, placeOrder, placeOrderOnline, processOrder } from '../controllers/order.js';
import { adminOnly, isAuthenticated } from '../middlewares/auth.js';



const router = express.Router();

router.post("/createorder", isAuthenticated, placeOrder);
router.post("/createorderonline", isAuthenticated, placeOrderOnline);
router.post("/paymentverification", isAuthenticated, paymentVerification);
router.get("/myorders", isAuthenticated, getMyOrders);
router.get("/order/:id", isAuthenticated, getOrderDetails);

// admin only
router.get("/admin/orders", isAuthenticated, adminOnly, getAdminOrders);
router.get("/admin/order/:id", isAuthenticated, adminOnly, processOrder);


export default router;