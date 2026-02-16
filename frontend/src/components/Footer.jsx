import React from "react";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-6 py-14">
        
        {/* Top Section */}
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          
          {/* Brand */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-white">Ekart</h2>
            <p className="text-sm leading-relaxed">
              Ekart is your trusted destination for quality electronics and
              accessories at competitive prices.
            </p>
            <div className="flex gap-3">
              <SocialLink icon={<FaFacebookF />} />
              <SocialLink icon={<FaTwitter />} />
              <SocialLink icon={<FaInstagram />} />
              <SocialLink icon={<FaLinkedinIn />} />
            </div>
          </div>

          {/* Links */}
          <div>
            <FooterHeading>Quick Links</FooterHeading>
            <ul className="space-y-2 text-sm">
              <FooterLink>Home</FooterLink>
              <FooterLink>Products</FooterLink>
              <FooterLink>About</FooterLink>
              <FooterLink>Contact</FooterLink>
            </ul>
          </div>

          {/* Support */}
          <div>
            <FooterHeading>Support</FooterHeading>
            <ul className="space-y-2 text-sm">
              <FooterLink>Help Center</FooterLink>
              <FooterLink>Shipping</FooterLink>
              <FooterLink>Returns</FooterLink>
              <FooterLink>Privacy Policy</FooterLink>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <FooterHeading>Newsletter</FooterHeading>
            <p className="text-sm">
              Get updates on new arrivals and special offers.
            </p>
            <form className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-pink-600"
              />
              <button
                type="button"
                className="rounded-md bg-pink-600 px-3 py-2 text-sm font-medium text-white hover:bg-pink-700"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-500 sm:flex sm:items-center sm:justify-between">
          <p>© {currentYear} Ekart. All rights reserved.</p>
          <div className="mt-3 flex justify-center gap-5 sm:mt-0">
            <span className="hover:text-gray-300 cursor-pointer">
              Terms
            </span>
            <span className="hover:text-gray-300 cursor-pointer">
              Cookies
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
};

const FooterHeading = ({ children }) => (
  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-200">
    {children}
  </h3>
);

const FooterLink = ({ children }) => (
  <li className="hover:text-white cursor-pointer transition-colors">
    {children}
  </li>
);

const SocialLink = ({ icon }) => (
  <div className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-gray-800 text-gray-400 hover:bg-pink-600 hover:text-white transition">
    {icon}
  </div>
);

export default Footer;
