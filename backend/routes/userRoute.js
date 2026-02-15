import express from 'express';
import { register, Emailverify, reverify, login, updateaUser} from "../controllers/user.js";
import { isAuthenticated, isAdmin} from '../middleware/isAuthentiacated.js';
import { logout } from '../controllers/user.js';
import { forgotPassword } from '../controllers/user.js';
import { verifyOTP } from '../controllers/user.js';
import { resetPassword } from '../controllers/user.js';  
import { allUsers } from '../controllers/user.js';   
import { getUserById } from '../controllers/user.js';
import { singleUpload } from '../middleware/multer.js';


const router = express.Router();

router.post('/register', register);
router.get("/verify-email/:token", Emailverify);
router.post('/reverify', reverify);
router.post('/login', login);
router.post('/logout', isAuthenticated, logout);
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp/:email', verifyOTP);
router.post('/reset-password/:email', resetPassword);
router.get('/all-users',isAuthenticated, isAdmin, allUsers);
router.get('/get-user/:userId', isAuthenticated, getUserById);
router.put("/user/update/:id", isAuthenticated, singleUpload, updateaUser)


export default router;