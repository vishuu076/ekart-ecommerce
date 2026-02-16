import React, { useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";

const ProductImg = ({ images = [] }) => {
  const [mainImg, setMainImg] = useState(images?.[0]?.url || "");

  if (!images.length) return null;

  return (
    <div className="flex flex-col md:flex-row gap-6">
      {/* Thumbnails */}
      <div className="flex md:flex-col gap-3 order-2 md:order-1">
        {images.map((img, index) => (
          <img
            key={index}
            src={img.url}
            alt={img.alt || "product thumbnail"}
            onClick={() => setMainImg(img.url)}
            className={`w-20 h-20 object-cover rounded-lg border cursor-pointer transition 
              ${
                mainImg === img.url
                  ? "border-pink-500 ring-2 ring-pink-200"
                  : "border-gray-200 hover:border-pink-400"
              }`}
          />
        ))}
      </div>

      {/* Main Image */}
      <div className="order-1 md:order-2">
        <Zoom>
          <img
            src={mainImg}
            alt="Main product"
            className="w-full max-w-[480px] rounded-xl border shadow-md object-contain bg-white"
          />
        </Zoom>
      </div>
    </div>
  );
};

export default ProductImg;
