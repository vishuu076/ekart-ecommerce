import React from "react";
// हम react-icons से कुछ आइकन्स इम्पोर्ट कर रहे हैं।
// आप अपनी पसंद के अनुसार इन्हें बदल सकते हैं।
import { FiTruck, FiShield, FiHeadphones, FiSmartphone, FiTag, FiRefreshCw } from "react-icons/fi";

const featuresData = [
  {
    id: 1,
    icon: <FiTruck />,
    title: "Fast & Free Shipping",
    description: "Enjoy free standard shipping on all orders above $50. We deliver fast.",
  },
  {
    id: 2,
    icon: <FiShield />,
    title: "Secure Payments",
    description: "Your transactions are 100% secure with our top-tier encryption capabilities.",
  },
  {
    id: 3,
    icon: <FiTag />,
    title: "Best Prices Guaranteed",
    description: "We ensure you get the latest tech at the most competitive market prices.",
  },
   {
    id: 4,
    icon: <FiSmartphone />,
    title: "Authentic Products",
    description: "All our electronics are 100% genuine and come with manufacturer warranty.",
  },
   {
    id: 5,
    icon: <FiRefreshCw />,
    title: "Easy Returns",
    description: "Not satisfied? Return your product within 30 days with our hassle-free policy.",
  },
  {
    id: 6,
    icon: <FiHeadphones />,
    title: "24/7 Customer Support",
    description: "Have questions? Our friendly support team is available around the clock.",
  },
];

const Features = () => {
  return (
    // SECTION BG: सफेद बैकग्राउंड ताकि हीरो सेक्शन से कंट्रास्ट बने।
    <section className="py-16 md:py-24 bg-white text-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* SECTION HEADER */}
        <div className="text-center mb-16">
          {/* छोटी हेडिंग में हम हीरो सेक्शन का रंग इस्तेमाल कर सकते हैं */}
          <h4 className="text-blue-600 font-semibold tracking-wide uppercase mb-2">Why Choose Us</h4>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            We provide the best experience
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
            Shop with confidence. We focus on providing quality products and top-notch service to all our customers.
          </p>
        </div>

        {/* FEATURES GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuresData.map((feature) => (
            <div 
              key={feature.id} 
              className="flex flex-col items-start p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-300 border border-transparent hover:border-gray-100"
            >
              {/* ICON CONTAINER:
                 यहाँ हम Hero सेक्शन के ग्रेडिएंट (blue-500 to purple-600) का उपयोग कर रहे हैं।
                 इससे यह सेक्शन Hero से जुड़ा हुआ लगेगा।
              */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white mb-6 shadow-md">
                <span className="text-3xl">
                  {feature.icon}
                </span>
              </div>
              
              <h3 className="text-xl font-bold mb-3 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;