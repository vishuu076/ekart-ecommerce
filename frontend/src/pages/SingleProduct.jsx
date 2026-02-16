import Breadcrums from "@/components/ProductBreadcrums.jsx";
import ProductDesc from "@/components/ProductDesc.jsx";
import ProductImg from "@/components/ProductImg.jsx";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

const SingleProduct = () => {
  const { id } = useParams();
  const { products = [] } = useSelector((store) => store.product);

  const product = products.find((item) => item._id === id);

  // 🔴 IMPORTANT GUARD (THIS FIXES BUILD)
  if (!product) {
    return (
      <div className="pt-32 text-center text-gray-500">
        Loading product...
      </div>
    );
  }

  return (
    <div className="pt-20 pb-10 max-w-7xl mx-auto px-4">
      <Breadcrums product={product} />

      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
        <ProductImg images={product.productImg} />
        <ProductDesc product={product} />
      </div>
    </div>
  );
};

export default SingleProduct;
