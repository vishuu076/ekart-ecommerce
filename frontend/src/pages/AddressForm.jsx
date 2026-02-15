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
    })

    const { cart, addresses, selectedAddress } = useSelector((store) => store.product)
    const [showForm, setShowForm] = React.useState(addresses?.length > 0 ? false : true)
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormdata({ ...formdata, [e.target.name]: e.target.value })
    }

    const handleSave = () => {
        dispatch(addAddress(formdata))
        setShowForm(false)
    }

    const subtotal = cart.totalPrice
    const shipping = subtotal > 50 ? 0 : 10
    const tax = parseFloat((subtotal * 0.05).toFixed(2))
    const total = subtotal + shipping + tax;

    const handlePayment = async () => {
        const accessToken = localStorage.getItem("accessToken")
        try {
            const { data } = await axios.post(`${import.meta.env.VITE_URL}/api/orders/create-order`, {
                products: cart?.items?.map(item => ({
                    quantity: item.quantity,
                     productId: item.productId || item._id
                })),
                tax,
                shipping,
                amount: total,
                currency: "INR"
            }, {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            if (!data.success) return toast.error("Something went wrong")



            const options = {
                key: import.meta.env.VITE_RAZORPAY_KEY_ID,
                order_id: data.order.id,
                name: "Ekart",
                description: "Order Payment",
                handler: async function (response) {
                    try {
                        const verifyRes = await axios.post(`${import.meta.env.VITE_URL}/api/orders/verify-payment`,
                            response, {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        })

                        if (verifyRes.data.success) {
                            toast.success("✅ Payment Successfull!")
                            dispatch(setCart({ items: [], totalPrice: 0 }))
                            navigate("/order-success")
                        } else {
                            toast.error("❌ Payment Verifaction failed")
                        }

                    } catch (error) {
                        console.log(error)
                        toast.error("Error verifying payment")
                    }
                },
                modal: {
                    ondismiss: async function () {
                    
                        await axios.post(`${import.meta.env.VITE_URL}/api/orders/verify-payment`, {
                            razorpay_order_id: data.order.id,
                            paymentFailed: true
                        }, {
                            headers: { Authorization: `Bearer ${accessToken}` }
                        });
                        toast.error("Payment Cancelled or Failed")

                    }
                },
                prefill: {
                    name: formdata.fullName,
                    email: formdata.email,
                    contact: formdata.phone
                },
                theme: { color: "#F472B6" }
            };

            const rzp = new window.Razorpay(options)

            
            rzp.on("payment.failed", async function (response) {
                await axios.post(`${import.meta.env.VITE_URL}/api/orders/verify-payment`, {
                    razorpay_order_id: data.order.id,
                    paymentFailed: true
                }, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                toast.error("Payment Failed. Please try again")
            })

            rzp.open()
        } catch (error) {
            console.log(error.response?.data || error.message);
            toast.error("Something went wrong while processing payment")
        }
    }

    return (
        <div className="max-w-7xl mx-auto grid place-items-center p-10">
            <div className="grid grid-cols-2 items-start gap-20 mt-10 max-w-7xl mx-auto">
                <div className="space-y-4 p-6 bg-white">
                    {
                        showForm ? (
                            <>
                                <div>
                                    <Label htmlFor="fullName">Full Name</Label>
                                    <Input
                                        name="fullName"
                                        id="fullName"
                                        required
                                        placeholder="John Doe"
                                        value={formdata.fullName}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        name="phone"
                                        id="phone"
                                        required
                                        placeholder="123-456-7890"
                                        value={formdata.phone}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="john@example.com"
                                        value={formdata.email}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div>
                                    <Label htmlFor="address">Address</Label>
                                    <Input
                                        name="address"
                                        id="address"
                                        required
                                        placeholder="123 Main Street"
                                        value={formdata.address}
                                        onChange={handleChange}
                                    />
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="city">City</Label>
                                        <Input
                                            name="city"
                                            id="city"
                                            required
                                            placeholder="Indore"
                                            value={formdata.city}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="state">State</Label>
                                        <Input
                                            name="state"
                                            id="state"
                                            required
                                            placeholder="Madhya Pradesh"
                                            value={formdata.state}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <Label htmlFor="zipCode">Zip Code</Label>
                                        <Input
                                            name="zipCode"
                                            id="zipCode"
                                            required
                                            placeholder="452001"
                                            value={formdata.zipCode}
                                            onChange={handleChange}
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="country">Country</Label>
                                        <Input
                                            name="country"
                                            id="country"
                                            required
                                            placeholder="India"
                                            value={formdata.country}
                                            onChange={handleChange}
                                        />
                                    </div>
                                </div>
                                <Button onClick={handleSave} className="w-full cursor-pointer">Save & Countinue</Button>
                            </>
                        ) : (
                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold">Saved Address</h2>
                                {
                                    addresses?.map((addr, index) => {
                                        return <div onClick={() => dispatch(setSelectedAddress(index))} key={index} className={`p-4 border rounded-md cursor-pointer relative ${selectedAddress === index ? 'border-pink-600 bg-pink-50' : 'border-gray-300'}`}>
                                            <p className="font-medium">{addr.fullName}</p>
                                            <p>{addr.phone}</p>
                                            <p>{addr.email}</p>
                                            <p>{addr.address}, {addr.city}, {addr.state} - {addr.zip}, {addr.country}</p>
                                            <button onClick={(e) => dispatch(deleteAddress(index))} className="absolute top-2  right-2 text-red-500 hover:text-red-700 text-sm cursor-pointer">Delete</button>
                                        </div>
                                    })
                                }

                                <Button variant='outline' className='w-full cursor-pointer' onClick={() => setShowForm(true)}>+ Add New Address </Button>
                                <Button disabled={selectedAddress === null}
                                    onClick={handlePayment}
                                    className='w-full cursor-pointer bg-pink-600 hover:bg-pink-700 text-white'>
                                    Proceed To Checkout</Button>
                            </div>
                        )
                    }
                </div>


                {/* Right side order summary*/}
                <div>
                    <Card className='w-[400px]'>
                        <CardHeader>
                            <CardTitle>Order Summary</CardTitle>
                        </CardHeader>
                        <CardContent className='space-y-4'>
                            <div className="flex justify-between">
                                <span>Subtotal {(cart.length)} items</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>

                            <div className="flex justify-between">
                                <span>Shipping {(cart.items.length)} items</span>
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
                            <div className="text-sm text-muted-foreground pt-4">
                                <p>* Free shipping on orders over 299</p>
                                <p>* 30-days return policy</p>
                                <p>* secure checkout with SSL encryption</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default AddressForm
