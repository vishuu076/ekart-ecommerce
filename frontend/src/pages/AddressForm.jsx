const AddressForm = () => {
  
  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <div className="grid gap-10 lg:grid-cols-2 items-start">
        
        {/* LEFT: Address Section */}
        <div className="bg-white rounded-lg p-6 space-y-6 border">
          {showForm ? (
            <>
              <h2 className="text-lg font-semibold">Add Shipping Address</h2>

              <div className="grid gap-4">
                <Input name="fullName" placeholder="Full Name" value={formdata.fullName} onChange={handleChange} />
                <Input name="phone" placeholder="Phone Number" value={formdata.phone} onChange={handleChange} />
                <Input name="email" placeholder="Email" value={formdata.email} onChange={handleChange} />
                <Input name="address" placeholder="Address" value={formdata.address} onChange={handleChange} />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="city" placeholder="City" value={formdata.city} onChange={handleChange} />
                  <Input name="state" placeholder="State" value={formdata.state} onChange={handleChange} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input name="zipCode" placeholder="Zip Code" value={formdata.zipCode} onChange={handleChange} />
                  <Input name="country" placeholder="Country" value={formdata.country} onChange={handleChange} />
                </div>

                <Button onClick={handleSave} className="bg-pink-600 hover:bg-pink-700">
                  Save & Continue
                </Button>
              </div>
            </>
          ) : (
            <>
              <h2 className="text-lg font-semibold">Select Delivery Address</h2>

              <div className="space-y-3">
                {addresses.map((addr, index) => (
                  <div
                    key={index}
                    onClick={() => dispatch(setSelectedAddress(index))}
                    className={`border rounded-md p-4 cursor-pointer relative transition
                      ${selectedAddress === index ? "border-pink-600 bg-pink-50" : "border-gray-300"}
                    `}
                  >
                    <p className="font-medium">{addr.fullName}</p>
                    <p className="text-sm">{addr.phone}</p>
                    <p className="text-sm">{addr.email}</p>
                    <p className="text-sm text-gray-600">
                      {addr.address}, {addr.city}, {addr.state} - {addr.zipCode}, {addr.country}
                    </p>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        dispatch(deleteAddress(index));
                      }}
                      className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>

              <div className="space-y-3 pt-4">
                <Button variant="outline" onClick={() => setShowForm(true)}>
                  + Add New Address
                </Button>

                <Button
                  disabled={selectedAddress === null}
                  onClick={handlePayment}
                  className="bg-pink-600 hover:bg-pink-700"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </>
          )}
        </div>

        {/* RIGHT: Order Summary */}
        <Card className="w-full">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹{subtotal.toLocaleString("en-IN")}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>₹{shipping}</span>
            </div>
            <div className="flex justify-between">
              <span>Tax</span>
              <span>₹{tax}</span>
            </div>

            <Separator />

            <div className="flex justify-between font-semibold text-base">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>

            <div className="text-xs text-gray-500 pt-3">
              <p>* Free shipping on orders above ₹299</p>
              <p>* 30-day return policy</p>
              <p>* Secure checkout</p>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
};
