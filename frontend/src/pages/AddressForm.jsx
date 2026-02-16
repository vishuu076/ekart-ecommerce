import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { addAddress, deleteAddress, setCart, setSelectedAddress } from "@/redux/productSlice";
import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
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
        phone: ""
    });

    const { cart, addresses, selectedAddress } = useSelector((store) => store.product);
    const [showForm, setShowForm] = React.useState(addresses?.length > 0 ? false : true);
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

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

                {/* LEFT */}
                <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6 space-y-5">
                    {showForm ? (
                        <>
                            <h2 className="text-xl font-semibold">Add New Address</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Full Name</Label>
                                    <Input name="fullName" value={formdata.fullName} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label>Phone</Label>
                                    <Input name="phone" value={formdata.phone} onChange={handleChange} />
                                </div>
                            </div>

                            <div>
                                <Label>Email</Label>
                                <Input name="email" value={formdata.email} onChange={handleChange} />
                            </div>

                            <div>
                                <Label>Address</Label>
                                <Input name="address" value={formdata.address} onChange={handleChange} />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>City</Label>
                                    <Input name="city" value={formdata.city} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label>State</Label>
                                    <Input name="state" value={formdata.state} onChange={handleChange} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <Label>Zip Code</Label>
                                    <Input name="zipCode" value={formdata.zipCode} onChange={handleChange} />
                                </div>
                                <div>
                                    <Label>Country</Label>
                                    <Input name="country" value={formdata.country} onChange={handleChange} />
                                </div>
                            </div>

                            <Button onClick={handleSave} className="w-full bg-pink-600 hover:bg-pink-700">
                                Save & Continue
                            </Button>
                        </>
                    ) : (
                        <>
                            <h2 className="text-xl font-semibold">Saved Address</h2>

                            <div className="space-y-3">
                                {addresses?.map((addr, index) => (
                                    <div
                                        key={index}
                                        onClick={() => dispatch(setSelectedAddress(index))}
                                        className={`p-4 rounded-lg border cursor-pointer transition ${selectedAddress === index
                                                ? "border-pink-600 bg-pink-50"
                                                : "border-gray-300 hover:border-pink-400"
                                            }`}
                                    >
                                        <p className="font-medium">{addr.fullName}</p>
                                        <p className="text-sm text-gray-600">{addr.phone}</p>
                                        <p className="text-sm text-gray-600">{addr.email}</p>
                                        <p className="text-sm">
                                            {addr.address}, {addr.city}, {addr.state}
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
                            </div>

                            <Button variant="outline" onClick={() => setShowForm(true)} className="w-full">
                                + Add New Address
                            </Button>

                            <Button
                                disabled={selectedAddress === null}
                                onClick={handlePayment}
                                className="w-full bg-pink-600 hover:bg-pink-700 text-white"
                            >
                                Proceed To Checkout
                            </Button>
                        </>
                    )}
                </div>

                {/* RIGHT */}
                <div>
                    <Card className="rounded-xl shadow-sm">
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
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
        </div>
    );
};

export default AddressForm
