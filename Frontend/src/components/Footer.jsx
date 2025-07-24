import {Mail, Phone } from "lucide-react";
import {FaFacebook,FaInstagram,FaTwitter, FaYoutube} from "react-icons/fa"

const Footer = () => {
  return (
    <>
      <div className="bg-gray-500 text-white w-full flex flex-wrap justify-around p-10 md:p-14 mt-10">
        {/* Contact Column */}
        <div className="min-w-[200px] mb-6">
          <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600">Contact</h2>
          <ul className="mt-3 font-serif">
            <li className="mb-2 flex items-center gap-2 cursor-pointer hover:text-cyan-400"><Phone /> 9715797858</li>
            <li className="mb-2 flex items-center gap-2 cursor-pointer hover:text-cyan-400"><Mail /> sudheeshravichandran@gmail.com</li>
          </ul>
        </div>

        {/*Social media */ }

        <div className="min-w-[200px] mb-6">
             <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600">Follow Me</h2>
         <div className="flex justify-center gap-4 mt-2 text-lg">
          <a href="#" className="hover:text-cyan-400"><FaFacebook /></a>
          <a href="#" className="hover:text-cyan-400"><FaInstagram /></a>
          <a href="#" className="hover:text-cyan-400"><FaTwitter /></a>
          <a href="#" className="hover:text-cyan-400"><FaYoutube/></a>
        </div>
        </div>

        {/* Support Column */}
        <div className="min-w-[200px] mb-6">
          <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600">Get Support?</h2>
          <ul className="mt-3 font-serif">
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Help & Support</li>
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Partner with Us</li>
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Ride With Us</li>
          </ul>
        </div>

        {/* Legal Column */}
        <div className="min-w-[200px] mb-6">
          <h2 className="text-xl font-serif font-extrabold cursor-pointer hover:text-cyan-600">Legal</h2>
          <ul className="mt-3 font-serif">
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Terms and Conditions</li>
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Cookie Policy</li>
            <li className="mb-2 cursor-pointer hover:text-cyan-400">Privacy Policy</li>
          </ul>
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
