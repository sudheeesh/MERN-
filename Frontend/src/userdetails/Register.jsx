import React, { useState } from 'react';
import { Mail, User, Lock } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../utils/axiosInstance';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../utils/authSlice';

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [isLogin, setIsLogin] = useState(false); // toggle login/register

  const [user, setUser] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { name, email, password } = user;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // validations
    if (!isLogin && (name.length < 3 || name.length > 25)) {
      return setError('Name must be between 3 and 25 characters');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return setError('Enter a valid email');
    }

    if (password.length < 8) {
      return setError('Password must be at least 8 characters');
    }

    try {
      setLoading(true);
      let res;

    if (isLogin) {
      res = await axiosInstance.post('/login', { email, password });
    } else {
      res = await axiosInstance.post('/register', { name, email, password });
    }


    // ✅ Save user to Redux and localStorage
    const { user, token } = res.data;
    const userWithToken = { ...user, token }
    dispatch(loginSuccess(userWithToken));
    localStorage.setItem('userInfo', JSON.stringify(userWithToken));

    navigate('/');
  } catch (err) {
  console.error("Login/Register Error ❌", err); // log full error
  const msg = err.response?.data?.message || err.message || 'Something went wrong';
  setError(msg);
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="mt-10 flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-800 to-black">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white bg-opacity-10 p-8 rounded-xl backdrop-blur-md text-white shadow-lg"
      >
        <h2 className="text-3xl font-bold text-center mb-6">
          {isLogin ? 'Sign In' : 'Sign Up'}
        </h2>

        {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

        {!isLogin && (
          <div className="mb-4">
            <label className="flex items-center gap-2">
              <User size={20} />
              <input
                type="text"
                name="name"
                placeholder="Username"
                value={name}
                onChange={handleChange}
                className="w-full p-3 rounded-lg bg-gray-700 bg-opacity-50 text-white placeholder-gray-300"
              />
            </label>
          </div>
        )}

        <div className="mb-4">
          <label className="flex items-center gap-2">
            <Mail size={20} />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 bg-opacity-50 text-white placeholder-gray-300"
            />
          </label>
        </div>

        <div className="mb-6">
          <label className="flex items-center gap-2">
            <Lock size={20} />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={handleChange}
              className="w-full p-3 rounded-lg bg-gray-700 bg-opacity-50 text-white placeholder-gray-300"
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-red-700 hover:bg-red-800 transition-colors p-3 rounded-lg text-lg font-medium"
        >
          {loading ? (isLogin ? 'Logging in...' : 'Signing Up...') : isLogin ? 'Sign In' : 'Sign Up'}
        </button>

        <p className="text-center mt-4 text-gray-300">
          {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
          <button
            type="button"
            onClick={() => setIsLogin(!isLogin)}
            className="text-blue-300 hover:underline"
          >
            {isLogin ? 'Register' : 'Sign In'}
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
