import React, { useState } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import { signInFailure,signInSuccess,signInStart} from '../redux/user/userSlice';
import { useDispatch,useSelector } from 'react-redux';
import Oauth from './Oauth';


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
                            <Oauth/>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Login
