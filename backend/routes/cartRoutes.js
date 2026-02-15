import express from "express"
import {isAdmin, isAuthenticated } from '../middleware/isAuthentiacated.js'
import { addToCart, getCart, removeFromCart, updateQuantity } from "../controllers/cartController.js"
import { multipleUpload } from "../middleware/multer.js"



const router = express.Router()

router.get('/', isAuthenticated, getCart)
router.post('/add', isAuthenticated, multipleUpload, addToCart)
router.put('/update', isAuthenticated, updateQuantity )
router.delete("/remove", isAuthenticated, removeFromCart)

export default router;