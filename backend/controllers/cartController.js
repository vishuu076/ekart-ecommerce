import { Cart } from "../models/cartModel.js";
import { Product } from "../models/productModel.js";

/* ================= GET CART ================= */
export const getCart = async (req, res) => {
  try {
    const userId = req.id;
    const cart = await Cart.findOne({ userId }).populate("items.productId");

    if (!cart) {
      return res.status(200).json({ success: true, cart: [] });
    }

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
      export const addToCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    
    // CHECK 1: Is the User Logged In?
    if (!userId) {
      console.log("ERROR: User ID is missing. Check Auth Middleware.");
      return res.status(401).json({ success: false, message: "User not authorized" });
    }

    // CHECK 2: Does the Product Exist?
    const product = await Product.findById(productId);
    
    if (!product) {
      console.log("ERROR: Product not found in DB.");
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    // CHECK 3: Does the product have a price?
    if (product.productPrice === undefined) {
        console.log("ERROR: Product has no price!");
        return res.status(400).json({ success: false, message: "Product data is incomplete" });
    }

    // --- LOGIC STARTS HERE ---
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      // Create new cart
      cart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: product.productPrice }],
        totalPrice: product.productPrice,
      });
    } else {
      // Update existing cart
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          price: product.productPrice,
        });
      }

      // Recalculate total
      cart.totalPrice = cart.items.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
      );
    }

    await cart.save();
    
    // Populate safely
    await cart.populate("items.productId");

    res.status(200).json({ success: true, message: "Product added", cart });

  } catch (error) {
    // THIS IS THE IMPORTANT PART
    console.error("🔥 CRASH REPORT 🔥");
    console.error(error); // This prints the specific line number in your terminal
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= UPDATE QUANTITY ================= */
export const updateQuantity = async (req, res) => {
  try {
    const userId = req.id;
    const { productId, type } = req.body; // type = increase | decrease

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    if (type === "increase") {
      item.quantity += 1;
    }

    if (type === "decrease" && item.quantity > 1) {
      item.quantity -= 1;
    }

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/* ================= REMOVE FROM CART ================= */
export const removeFromCart = async (req, res) => {
  try {
    const userId = req.id;
    const { productId } = req.body;

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );

    cart.totalPrice = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );

    await cart.save();
    cart = await cart.populate("items.productId");

    res.status(200).json({ success: true, cart });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
