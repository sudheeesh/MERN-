import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <footer className="font-sans mt-10">
      {/* Back to Top */}
      <div
        onClick={scrollToTop}
        className="bg-[#37475A] hover:bg-[#485769] transition-colors py-4 text-center text-white text-sm font-medium cursor-pointer"
      >
        Back to top
      </div>

      {/* Main Footer Content */}
      <div className="bg-gray-100 text-gray-800 pt-10 pb-10 px-4 md:px-8 border-b border-gray-300">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">

          {/* Column 1 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-black">Get to Know Us</h3>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">About Us</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Careers</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Press Releases</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Amazon Science</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-black">Connect with Us</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-600 hover:underline hover:text-blue-600 flex items-center gap-2"><FaFacebook /> Facebook</a>
              <a href="#" className="text-gray-600 hover:underline hover:text-blue-600 flex items-center gap-2"><FaTwitter /> Twitter</a>
              <a href="#" className="text-gray-600 hover:underline hover:text-blue-600 flex items-center gap-2"><FaInstagram /> Instagram</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-black">Make Money with Us</h3>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Sell on Amazon</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Protect and Build Your Brand</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Global Selling</a>
            <a href="#" className="text-gray-600 hover:underline hover:text-blue-600">Become an Affiliate</a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-black">Let Us Help You</h3>
            <div className="text-black space-y-2">
              <p className="flex items-center gap-2 text-gray-600"><Phone size={14} /> 9715797858</p>
              <p className="flex items-center gap-2 break-all text-gray-600"><Mail size={14} /> sudheesh@gmail.com</p>
              <a href="#" className="text-gray-600 hover:underline hover:text-blue-600 block">Returns Centre</a>
              <a href="#" className="text-gray-600 hover:underline hover:text-blue-600 block">Help</a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-200 text-gray-600 py-8 text-xs text-center border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span className="cursor-pointer hover:underline text-gray-800">Conditions of Use & Sale</span>
            <span className="cursor-pointer hover:underline text-gray-800">Privacy Notice</span>
            <span className="cursor-pointer hover:underline text-gray-800">Interest-Based Ads</span>
          </div>
          <p>© 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
