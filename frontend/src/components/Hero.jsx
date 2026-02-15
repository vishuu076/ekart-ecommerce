import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";


const Hero = () => {
    const navigate = useNavigate()
    return (
       <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
            <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className>
                    <h1 className="text-4xl md:text-6xl font-bold mb-4">Latest Electronics at Best Prices</h1>
                    <p className="text-lg mb-6">Discover a wide range of electronics, from smartphones to laptops, all at unbeatable prices. Shop now and experience the best in technology!</p>
                    <div className="flex flex-col sm:flex-row gap-4">
                        <Button  onClick={() => navigate("/products")} className="bg-white text-blue-600 hover:bg-gray-100">Shop Now</Button>
                    </div>
                </div> 
                 <div className="relative">
                <img src="/Hero.png" alt="Hero" width={500} height={400}  className="rounded-lg shadow-2xl"/>
            </div> 
            </div>
        </div>
       </section>
    );
}   

export default Hero;