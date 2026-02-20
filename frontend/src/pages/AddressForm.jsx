import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  addAddress,
  deleteAddress,
  setCart,
  setSelectedAddress,
} from "@/redux/productSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const AddressForm = () => {
  const [formdata, setFormdata] = React.useState({
    fullName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
    email: "",
    phone: "",
  });

  const { cart, addresses, selectedAddress } = useSelector(
    (store) => store.product
  );

  const [showForm, setShowForm] = React.useState(
    addresses?.length > 0 ? false : true
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    dispatch(addAddress(formdata));
    setShowForm(false);
  };

  const subtotal = cart.totalPrice;
  const shipping = subtotal > 50 ? 0 : 10;
  const tax = parseFloat((subtotal * 0.05).toFixed(2));
  const total = subtotal + shipping + tax;

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const { data } = await axios.post(
        `${import.meta.env.VITE_URL}/api/orders/create-order`,
        {
          products: cart?.items?.map((item) => ({
            quantity: item.quantity,
            productId: item.productId || item._id,
          })),
          tax,
          shipping,
          amount: total,
          currency: "INR",
        },
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      );

      if (!data.success) return toast.error("Something went wrong");

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID,
        order_id: data.order.id,
        name: "Ekart",
        description: "Order Payment",
        handler: async function (response) {
          try {
            const verifyRes = await axios.post(
              `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
              response,
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );

            if (verifyRes.data.success) {
              toast.success("✅ Payment Successfull!");
              dispatch(setCart({ items: [], totalPrice: 0 }));
              navigate("/order-success");
            } else {
              toast.error("❌ Payment Verification failed");
            }
          } catch (error) {
            toast.error("Error verifying payment");
          }
        },
        modal: {
          ondismiss: async function () {
            await axios.post(
              `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
              {
                razorpay_order_id: data.order.id,
                paymentFailed: true,
              },
              { headers: { Authorization: `Bearer ${accessToken}` } }
            );
            toast.error("Payment Cancelled or Failed");
          },
        },
        prefill: {
          name: formdata.fullName,
          email: formdata.email,
          contact: formdata.phone,
        },
        theme: { color: "#F472B6" },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function () {
        await axios.post(
          `${import.meta.env.VITE_URL}/api/orders/verify-payment`,
          {
            razorpay_order_id: data.order.id,
            paymentFailed: true,
          },
          { headers: { Authorization: `Bearer ${accessToken}` } }
        );
        toast.error("Payment Failed. Please try again");
      });

      rzp.open();
    } catch (error) {
      toast.error("Something went wrong while processing payment");
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-20 mt-6 items-start">
        {/* LEFT FORM */}
        <div className="space-y-4 p-4 sm:p-6 bg-white rounded-lg">
          {showForm ? (
            <>
              <div>
                <Label htmlFor="fullName">Full Name</Label>
                <Input name="fullName" value={formdata.fullName} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input name="phone" value={formdata.phone} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input name="email" value={formdata.email} onChange={handleChange} />
              </div>
              <div>
                <Label htmlFor="address">Address</Label>
                <Input name="address" value={formdata.address} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>City</Label>
                  <Input name="city" value={formdata.city} onChange={handleChange} />
                </div>
                <div>
                  <Label>State</Label>
                  <Input name="state" value={formdata.state} onChange={handleChange} />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <Label>Zip Code</Label>
                  <Input name="zipCode" value={formdata.zipCode} onChange={handleChange} />
                </div>
                <div>
                  <Label>Country</Label>
                  <Input name="country" value={formdata.country} onChange={handleChange} />
                </div>
              </div>
              <Button className="w-full" onClick={handleSave}>
                Save & Continue
              </Button>
            </>
          ) : (
            <div className="space-y-4">
              <h2 className="text-lg font-semibold">Saved Address</h2>
              {addresses?.map((addr, index) => (
                <div
                  key={index}
                  onClick={() => dispatch(setSelectedAddress(index))}
                  className={`p-4 border rounded-md cursor-pointer relative ${
                    selectedAddress === index
                      ? "border-pink-600 bg-pink-50"
                      : "border-gray-300"
                  }`}
                >
                  <p className="font-medium">{addr.fullName}</p>
                  <p>{addr.phone}</p>
                  <p>{addr.email}</p>
                  <p>
                    {addr.address}, {addr.city}, {addr.state} - {addr.zipCode},{" "}
                    {addr.country}
                  </p>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(deleteAddress(index));
                    }}
                    className="absolute top-2 right-2 text-red-500 text-sm"
                  >
                    Delete
                  </button>
                </div>
              ))}

              <Button variant="outline" className="w-full" onClick={() => setShowForm(true)}>
                + Add New Address
              </Button>
              <Button
                disabled={selectedAddress === null}
                onClick={handlePayment}
                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
              >
                Proceed To Checkout
              </Button>
            </div>
          )}
        </div>

        {/* RIGHT SUMMARY */}
        <Card className="w-full lg:w-[400px]">
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
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
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>₹{total.toLocaleString("en-IN")}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AddressForm;