import React from "react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-gradient-to-r from-pink-50 via-white to-pink-100 py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          
          {/* Text */}
          <div className="space-y-6">
            <h1 className="text-3xl font-bold leading-tight text-gray-900 sm:text-4xl md:text-5xl">
              Latest Electronics at{" "}
              <span className="text-pink-600">Best Prices</span>
            </h1>

            <p className="max-w-xl text-base text-gray-600 sm:text-lg">
              Discover top-quality electronics including smartphones, laptops,
              and accessories — all at competitive prices you’ll love.
            </p>

            <Button
              onClick={() => navigate("/products")}
              className="bg-pink-600 px-6 py-3 text-white hover:bg-pink-700"
            >
              Shop Now
            </Button>
          </div>

          {/* Image */}
          <div className="flex justify-center md:justify-end">
            <img
              src="/Hero.png"
              alt="Electronics Banner"
              className="w-full max-w-md rounded-xl object-contain shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
