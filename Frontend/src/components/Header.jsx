import { Link } from "react-router-dom";
import { useState } from "react";
import { CDN_URL } from "../mocobot";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useSelector } from "react-redux";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggleMenu =()=> setIsMenuOpen(!isMenuOpen)
  const isAuthenticated  = false

  const cartitems = useSelector((store) => store.cart.items)

  const cartCount = cartitems.reduce((total,item) => total + (item.quantity || 1),0)

  return (
    <header className= "fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-1">
        {/* Logo */}
        <div className="flex items-center">
          <img className="h-16 w-auto object-contain" src={CDN_URL} alt="logo" />
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <form className="w-full">
            <div className="flex items-center bg-blue-100 rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="Search for Products, brands and more"
                className="flex-1 bg-transparent text-sm px-2 py-1 outline-none placeholder:text-gray-500"
              />
              <button type="submit" className="text-blue-600">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21 21l-4.35-4.35m1.85-5.4a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-semibold font-sans pl-10">
          <Link className="hover:text-cyan-600" to="/">Home</Link>
          <Link className="hover:text-cyan-600" to="/categories">Categories</Link>
          <Link className="hover:text-cyan-600" to="/grocery">Grocery</Link>
          <Link className="hover:text-cyan-600 flex items-center gap-1 relative" to="/cart">
            Cart  <ShoppingCart className="w-5 h-5" />
           {cartCount > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
          {cartCount}
        </span>)}
          </Link>
          {!isAuthenticated && <Link className="hover:text-cyan-600" to="/register">
            <User className="w-5 h-5" />
          </Link>}
        </nav>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Nav Menu with Animation */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pb-4 text-base font-medium">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/about" onClick={() => setIsMenuOpen(false)}>About Us</Link></li>
          <li><Link to="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link></li>
          <li><Link to="/grocery" onClick={() => setIsMenuOpen(false)}>Grocery</Link></li>
          <li><Link to="/register" onClick={() => setIsMenuOpen(false)}>Profile</Link></li>
        </ul>
      </div>
    </header>
  );
};

export default Header;
