import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Oauth from './Oauth';


function Signup() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // Added success state
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      setSuccess(false); // Reset success state on new submit
      const res = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      console.log(data);
      setLoading(false);
      if (data.success === false) {
        setError(true);
        return;
      }
      setSuccess(true); // Set success to true on successful registration
      navigate('/sign-in');
    } catch (error) {
      setLoading(false);
      setError(true);
    }
  };

  return (
    <div className='flex w-full h-screen'>
      <div className='w-full flex items-center justify-center lg:w-full'>
        <div>
          <h1 className='text-5xl font-semibold mt-1 '>SignUp</h1>
          <p className='font-medium text-lg text-gray-500 mt-3'>Please fill your details.</p>

          <div className='mt-4'>
            <div className='space-y-1'>
              <label htmlFor='username' className='mt-3 font-semibold flex text-lg'>
                Username
              </label>
              <input
                type='text'
                id='username'
                className='w-full px-3 py-3 border border-gray-500'
                placeholder='Username'
                value={formData?.username || ''} // Use optional chaining and default to empty string
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mt-4'>
            <div className='space-y-1'>
              <label htmlFor='email' className='mt-3 font-semibold flex text-lg'>
                Email
              </label>
              <input
                type='email'
                id='email'
                className='w-full px-3 py-3 border border-gray-500'
                placeholder='Email'
                value={formData?.email || ''} // Use optional chaining and default to empty string
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mt-4'>
            <div className='space-y-1'>
              <label htmlFor='password' className='mt-3 font-semibold flex text-lg'>
                Password
              </label>
              <input
                type='password'
                id='password'
                className='w-full px-3 py-3 border border-gray-500'
                placeholder='Password'
                value={formData?.password || ''} // Use optional chaining and default to empty string
                onChange={handleChange}
              />
            </div>
          </div>

          <div className='mt-4'>
            <div className='space-y-1'>
              <label htmlFor='confirmPassword' className='mt-3 font-semibold flex text-lg'>
                Confirm Password
              </label>
              <input
                type='password'
                id='confirmPassword'
                className='w-full px-3 py-3 border border-gray-500'
                placeholder='Confirm Password'
                value={formData?.confirmPassword || ''} // Use optional chaining and default to empty string
                onChange={handleChange}
              />
            </div>
          </div>

          <button
            className='mt-8 w-full text-center bg-blue-500 px-3 py-3 rounded-lg'
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Registering...' : 'Register'}
          </button>

          {error && (
            <p className='text-red-500 mt-4'>{error.message || 'Something went wrong'}</p>
          )}
          {success && (
            <p className='text-green-500 mt-5 text-xl mr-2'>User Registered Successfully</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Signup;
