import Breadcrums from "@/components/ProductBreadcrums.jsx";
import ProductDesc from "@/components/ProductDesc.jsx";
import ProductImg from "@/components/ProductImg.jsx";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { products } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  // safety (page refresh / direct URL)
  if (!product) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading product details...
      </div>
    );
  }

  return (
    <div className="pt-24 pb-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrums product={product} />

        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* LEFT - IMAGES */}
          <div className="bg-white p-4 rounded-xl shadow-sm">
            <ProductImg images={product.productImg} />
          </div>

          {/* RIGHT - DESCRIPTION */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <ProductDesc product={product} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
