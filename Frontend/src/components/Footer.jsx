import { Mail, Phone } from "lucide-react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa"

const Footer = () => {
  return (
    <>
      <div className="bg-gray-500 text-white w-full px-6 py-10 md:px-16 mt-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Contact Column */}
          <div>
            <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600 mb-4">Contact</h2>
            <ul className="font-serif space-y-2">
              <li className="flex items-center gap-2 cursor-pointer hover:text-cyan-400 group">
                <Phone className="w-5 h-5 group-hover:text-cyan-400" />
                <span className="text-sm md:text-base">9715797858</span>
              </li>
              <li className="flex items-center gap-2 cursor-pointer hover:text-cyan-400 group">
                <Mail className="w-5 h-5 group-hover:text-cyan-400" />
                <span className="text-sm md:text-base break-all">sudheesh@gmail.com</span>
              </li>
            </ul>
          </div>

          {/*Social media */}
          <div>
            <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600 mb-4">Follow Me</h2>
            <div className="flex gap-4 text-xl">
              <a href="#" className="hover:text-cyan-400 transition-colors"><FaFacebook /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><FaInstagram /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><FaTwitter /></a>
              <a href="#" className="hover:text-cyan-400 transition-colors"><FaYoutube /></a>
            </div>
          </div>

          {/* Support Column */}
          <div>
            <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600 mb-4">Get Support?</h2>
            <ul className="font-serif space-y-2 text-sm md:text-base">
              <li className="cursor-pointer hover:text-cyan-400">Help & Support</li>
              <li className="cursor-pointer hover:text-cyan-400">Partner with Us</li>
              <li className="cursor-pointer hover:text-cyan-400">Ride With Us</li>
            </ul>
          </div>

          {/* Legal Column */}
          <div>
            <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600 mb-4">Legal</h2>
            <ul className="font-serif space-y-2 text-sm md:text-base">
              <li className="cursor-pointer hover:text-cyan-400">Terms and Conditions</li>
              <li className="cursor-pointer hover:text-cyan-400">Cookie Policy</li>
              <li className="cursor-pointer hover:text-cyan-400">Privacy Policy</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="bg-gray-500 text-white text-center py-4 border-t border-gray-400">
        <h1 className="font-serif text-lg font-bold cursor-pointer hover:text-cyan-400">
          Ecommerce
        </h1>
        <p className="text-sm mt-1 font-light">© 2024 – All Rights Reserved</p>
      </div>
    </>
  );
};

export default Footer;
