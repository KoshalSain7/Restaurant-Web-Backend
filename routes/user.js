import express from 'express';
import passport from 'passport';
import { getAdminStats, getAdminUsers, getmyprofile, logout } from '../controllers/user.js';
import { adminOnly, isAuthenticated } from '../middlewares/auth.js';

const router = express.Router();

router.get('/googlelogin', passport.authenticate('google', {
    scope: ['profile']
}));
router.get('/login', passport.authenticate('google'), (req, res) => {
    res.send("Logged In")
});
router.get('/me', isAuthenticated, getmyprofile);
router.get('/logout', logout)

//Admin Only
router.get("/admin/users", isAuthenticated, adminOnly, getAdminUsers);
router.get("/admin/stats", isAuthenticated, adminOnly, getAdminStats);
export default router;