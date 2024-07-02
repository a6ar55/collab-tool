import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signInFailure,signInSuccess,signInStart} from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
function Login() {

    const [formData, setFormData] = useState({});
    const { loading, error } = useSelector((state) => state.user);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch('/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        console.log("login failed");
        dispatch(signInFailure(data));
        return;
      }
      console.log('login success');
      navigate('/dashboard');
      dispatch(signInSuccess(data));
    } catch (error) {
      dispatch(signInFailure(error));
    }
  };

    return (
        <div className='flex w-full h-screen'>
            <div className='w-full flex items-center justify-center lg:w-full'>
                <div className=''>
                    <h1 className='text-5xl font-semibold mt-1 '>Welcome Back</h1>
                    <p className='font-medium text-lg text-gray-500 mt-3 '>Welcome back! Please enter your details.</p>
                    <form onSubmit={handleSubmit} className='mt-4'>
                        <div className='space-y-1'>
                            <label htmlFor="email" className='mt-3 font-semibold flex text-lg '>Email</label>
                            <input type="text" id="email" className='w-full px-3 py-3 border border-gray-500' placeholder='Email' onChange={handleChange} />
                        </div>
                        <div className='space-y-1'>
                            <label htmlFor="password" className='mt-3 font-semibold flex text-lg'>Password</label>
                            <input type="password" id="password" className='w-full px-3 py-3 border border-gray-500' placeholder='Password' onChange={handleChange}/>
                        </div>
                        <div>
                            <button type="button" className='mt-5 text-blue-500'>Forgot Password</button>
                        </div>
                        <div className='mt-8 flex flex-col gap-5 '>
                            <button type="submit" className='items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 px-3 rounded-lg text-black-700 font-semibold text-lg border-2 border-gray-500 bg-blue-500'>
                                Login
                            </button>
                            <button type="button" className='flex items-center justify-center gap-2 active:scale-[.98] active:duration-75 transition-all hover:scale-[1.01] ease-in-out transform py-3 px-3 rounded-lg text-gray-700 font-semibold text-lg border-2 border-gray-500 bg-white'>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.26644 9.76453C6.19903 6.93863 8.85469 4.90909 12.0002 4.90909C13.6912 4.90909 15.2184 5.50909 16.4184 6.49091L19.9093 3C17.7821 1.14545 15.0548 0 12.0002 0C7.27031 0 3.19799 2.6983 1.24023 6.65002L5.26644 9.76453Z" fill="#EA4335"/>
                                    <path d="M16.0406 18.0142C14.9508 18.718 13.5659 19.0926 11.9998 19.0926C8.86633 19.0926 6.21896 17.0785 5.27682 14.2695L1.2373 17.3366C3.19263 21.2953 7.26484 24.0017 11.9998 24.0017C14.9327 24.0017 17.7352 22.959 19.834 21.0012L16.0406 18.0142Z" fill="#34A853"/>
                                    <path d="M19.8342 20.9978C22.0292 18.9503 23.4545 15.9019 23.4545 11.9982C23.4545 11.2891 23.3455 10.5255 23.1818 9.81641H12V14.4528H18.4364C18.1188 16.0119 17.2663 17.2194 16.0407 18.0108L19.8342 20.9978Z" fill="#4A90E2"/>
                                    <path d="M5.27698 14.2663C5.03833 13.5547 4.90909 12.7922 4.90909 11.9984C4.90909 11.2167 5.03444 10.4652 5.2662 9.76294L1.23999 6.64844C0.436587 8.25884 0 10.0738 0 11.9984C0 13.918 0.444781 15.7286 1.23746 17.3334L5.27698 14.2663Z" fill="#FBBC05"/>
                                </svg>
                                Continue with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
