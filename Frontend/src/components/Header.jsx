import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CDN_URL } from "../mocobot";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../utils/authSlice";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = !!user;
  

  const cartItems = useSelector((store) => store.cart.items);
  const cartCount = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    navigate("/");
  };

  useEffect(() => {
    const userInfo = localStorage.getItem("userInfo");
    if (userInfo) {
      dispatch(loginSuccess(JSON.parse(userInfo)));
    }
  }, [dispatch]);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-1">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img className="h-16 w-auto object-contain" src={CDN_URL} alt="logo" />
          </Link>
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
            Cart <ShoppingCart className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Profile Dropdown */}
          <div className="relative">
            <button onClick={toggleDropdown} className="hover:text-cyan-600">
              <User className="w-5 h-5" />
            </button>
            {showDropdown && (
              <div className="absolute right-0 mt-2 bg-white shadow-md rounded-md p-8  min-w-[160px] z-50 flex flex-col text-sm font-medium">
                {!isAuthenticated ? (
                  <button
                    onClick={() => {
                      navigate("/register");
                      setShowDropdown(false);
                    }}
                    className="text-left hover:text-blue-500"
                  >
                    Login / Signup
                  </button>
                ) : (
                  <>
                    <span className="text-gray-800 mb-1">👋 {user?.name}</span>
                    <Link
                      to="/my-orders"
                      onClick={() => setShowDropdown(false)}
                      className="hover:text-blue-500 mt-1"
                    >
                      My Orders
                    </Link>
                    <Link
                      to="/profile"
                      onClick={() => setShowDropdown(false)}
                      className="hover:text-blue-500 mt-1"
                    >
                      My Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="text-left text-red-500 mt-2 hover:underline"
                    >
                      Logout
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger Icon (Mobile Only) */}
        <div className="md:hidden">
          <Menu className="w-6 h-6 cursor-pointer" onClick={toggleMenu} />
        </div>
      </div>

      {/* Mobile Nav */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden md:hidden ${
          isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 pb-4 text-base font-medium">
          <li><Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link></li>
          <li><Link to="/categories" onClick={() => setIsMenuOpen(false)}>Categories</Link></li>
          <li><Link to="/grocery" onClick={() => setIsMenuOpen(false)}>Grocery</Link></li>
          <li><Link to="/cart" onClick={() => setIsMenuOpen(false)}>Cart</Link></li>
          <li>
            {!isAuthenticated ? (
              <Link to="/register" onClick={() => setIsMenuOpen(false)}>Login / Signup</Link>
            ) : (
              <>
                <span className="text-gray-700">👋 {user.name}</span>
                <Link to="/orders" onClick={() => setIsMenuOpen(false)}>My Orders</Link>
                <Link to="/profile" onClick={() => setIsMenuOpen(false)}>My Profile</Link>
                <button onClick={handleLogout} className="text-red-500">Logout</button>
              </>
            )}
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Header;

