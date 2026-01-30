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
      <div className="bg-[#232F3E] text-white pt-10 pb-10 px-6 border-b border-gray-600">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">

          {/* Column 1 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-white">Get to Know Us</h3>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">About Us</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Careers</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Press Releases</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Amazon Science</a>
          </div>

          {/* Column 2 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-white">Connect with Us</h3>
            <div className="flex flex-col space-y-2">
              <a href="#" className="text-gray-300 hover:underline hover:text-white flex items-center gap-2"><FaFacebook /> Facebook</a>
              <a href="#" className="text-gray-300 hover:underline hover:text-white flex items-center gap-2"><FaTwitter /> Twitter</a>
              <a href="#" className="text-gray-300 hover:underline hover:text-white flex items-center gap-2"><FaInstagram /> Instagram</a>
            </div>
          </div>

          {/* Column 3 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-white">Make Money with Us</h3>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Sell on Amazon</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Protect and Build Your Brand</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Global Selling</a>
            <a href="#" className="text-gray-300 hover:underline hover:text-white">Become an Affiliate</a>
          </div>

          {/* Column 4 */}
          <div className="flex flex-col space-y-3">
            <h3 className="font-bold text-base text-white">Let Us Help You</h3>
            <div className="text-gray-300 space-y-2">
              <p className="flex items-center gap-2"><Phone size={14} /> 9715797858</p>
              <p className="flex items-center gap-2 break-all"><Mail size={14} /> sudheesh@gmail.com</p>
              <a href="#" className="hover:underline hover:text-white block">Returns Centre</a>
              <a href="#" className="hover:underline hover:text-white block">Help</a>
            </div>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-[#131A22] text-gray-300 py-8 text-xs text-center border-t border-gray-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4 mb-4">
            <span className="cursor-pointer hover:underline">Conditions of Use & Sale</span>
            <span className="cursor-pointer hover:underline">Privacy Notice</span>
            <span className="cursor-pointer hover:underline">Interest-Based Ads</span>
          </div>
          <p>© 1996-{new Date().getFullYear()}, Amazon.com, Inc. or its affiliates</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
