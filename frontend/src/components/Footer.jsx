import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8 ">
      <div className="max-w-7xl mx-auto px-4">
       
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-white">ElectroShop</h2>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for the latest electronics, gadgets, and tech accessories at unbeatable prices. Quality guaranteed.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<FaFacebookF />} />
              <SocialLink href="#" icon={<FaTwitter />} />
              <SocialLink href="#" icon={<FaInstagram />} />
              <SocialLink href="#" icon={<FaLinkedinIn />} />
            </div>
          </div>

          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-3">
              <FooterLink href="#">Home</FooterLink>
              <FooterLink href="#">Shop All Products</FooterLink>
              <FooterLink href="#">About Us</FooterLink>
              <FooterLink href="#">Contact Us</FooterLink>
              <FooterLink href="#">Blog</FooterLink>
            </ul>
          </div>

          <div>
            <FooterHeading>Customer Care</FooterHeading>
            <ul className="space-y-3">
              <FooterLink href="#">Help Center & FAQs</FooterLink>
              <FooterLink href="#">Shipping & Delivery</FooterLink>
              <FooterLink href="#">Returns & Exchanges</FooterLink>
              <FooterLink href="#">Track Your Order</FooterLink>
              <FooterLink href="#">Privacy Policy</FooterLink>
            </ul>
          </div>

          
          <div>
            <FooterHeading>Stay Updated</FooterHeading>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for exclusive deals, new arrivals, and tech news.
            </p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="px-4 py-3 bg-gray-800 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border border-gray-700"
              />
             
              <button className="px-4 py-3 font-semibold rounded-md text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-opacity">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 mt-8 md:flex md:items-center md:justify-between">
          <p className="text-gray-500 text-sm text-center md:text-left mb-4 md:mb-0">
            © {currentYear} ElectroShop. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-500">
             <a href="#" className="hover:text-gray-300 transition">Terms of Service</a>
             <a href="#" className="hover:text-gray-300 transition">Cookie Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};


const FooterHeading = ({ children }) => (
  <h3 className="text-sm font-semibold text-gray-100 uppercase tracking-wider mb-6">
    {children}
  </h3>
);


const FooterLink = ({ href, children }) => (
  <li>
    <a 
      href={href} 
      className="text-gray-400 hover:text-white transition-colors duration-300 block"
    >
      {children}
    </a>
  </li>
);


const SocialLink = ({ href, icon }) => (
  <a 
    href={href}
    className="w-10 h-10 flex items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-blue-600 hover:text-white transition-all duration-300"
  >
    {icon}
  </a>
);

export default Footer;