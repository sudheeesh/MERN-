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
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3 md:py-1">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/">
            <img className="h-16 w-auto object-contain" src={CDN_URL} alt="logo" />
          </Link>
        </div>

        {/* Search bar */}
        <div className="hidden md:flex flex-1 mx-6">
          <form className="w-full" onSubmit={HandleSubmit}>
            <div className="flex items-center bg-blue-100 rounded-md px-2 py-1">
              <input
                type="text"
                placeholder="Search for Products, brands and more"
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
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
        {showSuggestions && suggestions.length > 0 && (
          <div className="w-48 ml-9 absolute left-0 right-0 mt-48 bg-white border border-gray-300 rounded shadow z-50"
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
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-lg font-semibold font-sans pl-10">
          <Link className="hover:text-cyan-600" to="/">Home</Link>
          {/* Categories Dropdown */}
<div
  className="relative"
  onMouseEnter={() => setDropdown(true)}
  onMouseLeave={() => setDropdown(true)}
>
  <span className="hover:text-cyan-600 cursor-pointer">Categories</span>

  {dropdown && (
    console.log(categories),
    
    <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md z-50">
      {categories.length > 0 ? (
        categories.map((cat) => (
          <Link
            key={cat._id}
            to={`/category/${cat.slug}`} // <-- use slug here
            className="block px-4 py-2 hover:bg-gray-100"
            onClick={() => setDropdown(false)}
          >
            {cat.name}
          </Link>
        ))
      ) : (
        <p className="px-4 py-2 text-gray-500">No categories</p>
      )}
    </div>
  )}
</div>

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

