import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-navbar bg-gradient-to-b from-pink-50 via-white to-white min-h-screen flex items-center">
      <div className="mx-auto max-w-7xl px-6 w-full">
        <div className="grid items-center gap-12 md:grid-cols-2">

          {/* TEXT */}
          <div className="space-y-6 text-center md:text-left">
            
            {/* Badge */}
            <span className="inline-block bg-pink-100 text-pink-600 px-4 py-1 rounded-full text-sm font-medium">
              New Collection 🚀
            </span>

            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
              Latest Electronics at{" "}
              <span className="text-pink-600">Best Prices</span>
            </h1>

            <p className="mx-auto md:mx-0 max-w-xl text-base text-gray-600 sm:text-lg leading-relaxed">
              Discover top-quality electronics including smartphones, laptops,
              and accessories — all at competitive prices you’ll love.
            </p>

            <div className="flex flex-col sm:flex-row items-center md:items-start gap-4">
              <Button
                onClick={() => navigate("/products")}
                className="bg-pink-600 px-8 py-4 text-white text-lg font-semibold shadow-md hover:bg-pink-700 hover:shadow-lg transition-all active:scale-95"
              >
                Shop Now
              </Button>

              <Button
                variant="outline"
                onClick={() => navigate("/products")}
                className="px-6 py-4 text-lg"
              >
                Explore
              </Button>
            </div>
          </div>

          {/* IMAGE */}
          <div className="flex justify-center md:justify-end relative">
            
            {/* Glow background */}
            <div className="absolute w-72 h-72 bg-pink-200 rounded-full blur-3xl opacity-40"></div>

            <img
              src="/Hero.png"
              alt="Electronics Banner"
              className="relative w-full max-w-[320px] sm:max-w-md rounded-2xl object-contain shadow-xl hover:scale-105 transition-transform duration-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;