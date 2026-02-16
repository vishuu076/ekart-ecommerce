const Cart = () => {

  return (
    <div className="pt-20 bg-gray-50 min-h-screen">
      {cart?.items?.length > 0 ? (
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>

          <div className="grid gap-8 lg:grid-cols-3">
            
            {/* LEFT: CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cart.items.map((item, index) => (
                <Card key={index}>
                  <CardContent className="p-4 flex flex-col sm:flex-row gap-4 items-center justify-between">
                    
                    {/* Product */}
                    <div className="flex gap-4 items-center w-full sm:w-auto">
                      <img
                        src={item.productId?.productImg?.[0]?.url || userLogo}
                        alt=""
                        className="w-20 h-20 rounded object-cover border"
                      />
                      <div>
                        <h2 className="font-semibold line-clamp-2">
                          {item.productId?.productName}
                        </h2>
                        <p className="text-sm text-gray-600">
                          ₹{Number(item.productId?.productPrice).toLocaleString("en-IN")}
                        </p>
                      </div>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.productId._id, "decrease")}
                      >
                        −
                      </Button>
                      <span className="font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleUpdateQuantity(item.productId._id, "increase")}
                      >
                        +
                      </Button>
                    </div>

                    {/* Price + Remove */}
                    <div className="flex items-center gap-6">
                      <p className="font-semibold">
                        ₹{Number(item.productId.productPrice).toLocaleString("en-IN")}
                      </p>
                      <button
                        onClick={() => handleRemove(item.productId._id)}
                        className="text-red-500 flex items-center gap-1 hover:underline"
                      >
                        <Trash2 className="w-4 h-4" />
                        Remove
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* RIGHT: ORDER SUMMARY */}
            <Card className="h-max">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal ({cart.items.length} items)</span>
                  <span>₹{subtotal.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>₹{shipping}</span>
                </div>

                <div className="flex justify-between">
                  <span>Tax (5%)</span>
                  <span>₹{tax}</span>
                </div>

                <Separator />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>

                <div className="flex gap-2 pt-3">
                  <Input placeholder="Promo Code" />
                  <Button variant="outline">Apply</Button>
                </div>

                <Button
                  onClick={() => navigate("/address")}
                  className="w-full bg-pink-600 hover:bg-pink-700"
                >
                  Place Order
                </Button>

                <Button variant="outline" className="w-full">
                  <Link to="/products">Continue Shopping</Link>
                </Button>

                <div className="text-xs text-gray-500 pt-3">
                  <p>* Free shipping on orders over ₹299</p>
                  <p>* 30-day return policy</p>
                  <p>* Secure checkout</p>
                </div>
              </CardContent>
            </Card>

          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center px-4">
          <div className="bg-pink-100 p-6 rounded-full">
            <ShoppingCart className="w-16 h-16 text-pink-600" />
          </div>
          <h2 className="mt-6 text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-600">
            Looks like you haven't added anything yet
          </p>
          <Button
            onClick={() => navigate("/products")}
            className="mt-6 bg-pink-600 hover:bg-pink-700"
          >
            Start Shopping
          </Button>
        </div>
      )}
    </div>
  );
};
