import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { CDN_URL } from "../mocobot";
import { Menu, ShoppingCart, User } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { logout, loginSuccess } from "../utils/authSlice";
import axiosInstance from "../utils/axiosInstance";

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [keyword,setKeyword] = useState("")
  const [suggestions,setSuggestions] = useState([])
  const [showSuggestions,setShowSuggestions] = useState(false)
  const [isHovered, setIsHovered] = useState(false);
  const [hideTimer, setHideTimer] = useState(null);
  const [categories,setCategories] = useState([])
  const [dropdown, setDropdown] = useState(false)


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

  useEffect(() => {
  if (!keyword.trim()) {
    setSuggestions([]);
    return;
  }

  const fetchSuggestions = async () => {
    try {
      const { data } = await axiosInstance.get(`/products?keyword=${keyword}`);
      setSuggestions(data.products.slice(0, 5));
      setShowSuggestions(true);
    } catch (error) {
      console.error("Suggestion fetch failed", error);
    }
  };

  const delay = setTimeout(fetchSuggestions, 300); // debounce
     return () => clearTimeout(delay);
       }, [keyword]);
    useEffect(() => {
       if (showSuggestions && !isHovered) {
       const timer = setTimeout(() => {
       setShowSuggestions(false);
       }, 4000);

       setHideTimer(timer);
       return () => clearTimeout(timer);
     }
     }, [showSuggestions, isHovered]);


 const HandleSubmit = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setShowSuggestions(false);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data} = await axiosInstance.get("/categories")
        setCategories(data.categories)
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories()
  },[])
  


  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 md:py-1">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/">
              <img className="h-12 md:h-16 w-auto object-contain" src={CDN_URL} alt="logo" />
            </Link>
          </div>

          {/* Desktop Search bar */}
          <div className="hidden md:flex flex-1 mx-6">
            <form className="w-full" onSubmit={HandleSubmit}>
              <div className="flex items-center bg-blue-50 rounded-full px-4 py-2 border border-blue-100 focus-within:border-blue-300 transition-colors">
                <input
                  type="text"
                  placeholder="Search for Products, brands and more"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-400 text-gray-700"
                />
                <button type="submit" className="text-blue-500 hover:text-blue-600">
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
             {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-16 left-0 right-0 w-[50%] mx-auto bg-white border border-gray-100 rounded-lg shadow-xl z-50 overflow-hidden"
                   onMouseEnter={() => {
                   setIsHovered(true);
                   if (hideTimer) clearTimeout(hideTimer);
                   }}
                   onMouseLeave={() => {
                   setIsHovered(false);
                   }}>
             {suggestions.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b last:border-none border-gray-50"
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    setShowSuggestions(false);
                    setKeyword('');
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-sans pl-10">
            <Link className="hover:text-blue-600 transition-colors" to="/">Home</Link>
            {/* Categories Dropdown */}
            <div
              className="relative group"
              
            >
              <span className="hover:text-blue-600 cursor-pointer py-2">Categories</span>

              <div className="absolute left-0 mt-0 w-48 bg-white shadow-xl rounded-md z-50 hidden group-hover:block border border-gray-100 origin-top-left animate-fade-in">
                <div className="py-2">
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <Link
                        key={cat._id}
                        to={`/category/${cat.slug}`}
                        className="block px-4 py-2 hover:bg-blue-50 text-gray-700 hover:text-blue-600"
                      >
                        {cat.name}
                      </Link>
                    ))
                  ) : (
                    <p className="px-4 py-2 text-gray-500">No categories</p>
                  )}
                </div>
              </div>
            </div>

            <Link className="hover:text-blue-600 transition-colors" to="/grocery">Grocery</Link>

            <Link className="hover:text-blue-600 flex items-center gap-1 relative transition-colors" to="/cart">
              <span className="hidden lg:inline">Cart</span> <ShoppingCart className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* Profile Dropdown */}
            <div className="relative">
              <button onClick={toggleDropdown} className="hover:text-blue-600 transition-colors flex items-center gap-1">
                <User className="w-5 h-5" />
              </button>
              {showDropdown && (
                <div className="absolute right-0 mt-2 bg-white shadow-xl rounded-lg p-2 min-w-[200px] z-50 flex flex-col text-sm border border-gray-100">
                  {!isAuthenticated ? (
                    <button
                      onClick={() => {
                        navigate("/register");
                        setShowDropdown(false);
                      }}
                      className="text-left w-full px-4 py-2 hover:bg-blue-50 rounded-md text-gray-700 font-medium"
                    >
                      Login / Signup
                    </button>
                  ) : (
                    <>
                      <div className="px-4 py-2 border-b border-gray-100 mb-1">
                        <span className="text-gray-900 font-semibold block">Hello,</span>
                        <span className="text-gray-600 truncate block">{user?.name}</span>
                      </div>
                      <Link
                        to="/my-orders"
                        onClick={() => setShowDropdown(false)}
                        className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-700"
                      >
                        My Orders
                      </Link>
                      <Link
                        to="/profile"
                        onClick={() => setShowDropdown(false)}
                        className="px-4 py-2 hover:bg-blue-50 rounded-md text-gray-700"
                      >
                        My Profile
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-md mt-1"
                      >
                        Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>
          </nav>

          {/* Mobile Right Icons */}
          <div className="flex md:hidden items-center gap-4">
             <Link className="hover:text-blue-600 flex items-center gap-1 relative" to="/cart">
              <ShoppingCart className="w-6 h-6 text-gray-700" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                  {cartCount}
                </span>
              )}
            </Link>
            <Menu className="w-6 h-6 cursor-pointer text-gray-700" onClick={toggleMenu} />
          </div>
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden mt-3 mb-1">
           <form className="w-full" onSubmit={HandleSubmit}>
              <div className="flex items-center bg-gray-100 rounded-lg px-3 py-2">
                <input
                  type="text"
                  placeholder="Search..."
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  className="flex-1 bg-transparent text-sm outline-none placeholder:text-gray-500 text-gray-800"
                />
                <button type="submit" className="text-gray-500">
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
             {showSuggestions && suggestions.length > 0 && (
            <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto">
             {suggestions.map((item) => (
                <div
                  key={item._id}
                  className="px-4 py-3 hover:bg-gray-50 cursor-pointer text-sm text-gray-700 border-b last:border-none border-gray-100"
                  onClick={() => {
                    navigate(`/product/${item._id}`);
                    setShowSuggestions(false);
                    setKeyword('');
                  }}
                >
                  {item.name}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Nav Menu */}
      <div
        className={`md:hidden bg-white border-t border-gray-100 shadow-inner overflow-hidden transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-[80vh] opacity-100 py-4" : "max-h-0 opacity-0 py-0"
        }`}
      >
        <ul className="flex flex-col gap-1 px-4 text-base font-medium text-gray-700">
           {!isAuthenticated ? (
             <li className="mb-2">
                 <Link to="/register" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg text-blue-600">
                    <User className="w-5 h-5"/> Login / Signup
                 </Link>
             </li>

            ) : (
              <li className="mb-2 bg-gray-50 rounded-lg p-3">
                 <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {user.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                        <span className="text-xs text-gray-500 block">Welcome Back,</span>
                        <span className="text-gray-900 font-semibold">{user.name}</span>
                    </div>
                 </div>
              </li>
            )}

          <li><Link to="/" onClick={() => setIsMenuOpen(false)} className="block p-3 hover:bg-gray-50 rounded-lg">Home</Link></li>
          
          {/* Mobile Categories Accordion-ish */}
          <li>
              <div className="block p-3 hover:bg-gray-50 rounded-lg cursor-pointer" onClick={() => setShowDropdown(!showDropdown)}>
                  <div className="flex justify-between items-center">
                    Categories
                    <span className={`transform transition-transform ${showDropdown ? 'rotate-180' : ''}`}>▼</span>
                  </div>
              </div>
              {showDropdown && (
                  <div className="pl-6 mt-1 space-y-1 border-l-2 border-gray-100 ml-3">
                      {categories.map(cat => (
                           <Link key={cat._id} to={`/category/${cat.slug}`} onClick={() => setIsMenuOpen(false)} className="block p-2 text-sm text-gray-600 hover:text-blue-500">
                             {cat.name}
                           </Link>
                      ))}
                  </div>
              )}
          </li>

          <li><Link to="/grocery" onClick={() => setIsMenuOpen(false)} className="block p-3 hover:bg-gray-50 rounded-lg">Grocery</Link></li>
          <li><Link to="/cart" onClick={() => setIsMenuOpen(false)} className="block p-3 hover:bg-gray-50 rounded-lg">Cart</Link></li>
           
           {isAuthenticated && (
               <>
                <li className="border-t border-gray-100 my-1"></li>
                <li><Link to="/my-orders" onClick={() => setIsMenuOpen(false)} className="block p-3 hover:bg-gray-50 rounded-lg">My Orders</Link></li>
                <li><Link to="/profile" onClick={() => setIsMenuOpen(false)} className="block p-3 hover:bg-gray-50 rounded-lg">My Profile</Link></li>
                <li><button onClick={handleLogout} className="w-full text-left p-3 text-red-500 hover:bg-red-50 rounded-lg">Logout</button></li>
               </>
           )}
        </ul>
      </div>
    </header>
  );
};

export default Header;

