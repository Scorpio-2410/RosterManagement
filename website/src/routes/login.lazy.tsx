import { useState } from 'react';
import { createLazyFileRoute, useRouter } from '@tanstack/react-router';
import { isAuthenticated, signIn } from '../utils/auth';

export const Route = createLazyFileRoute('/login')({
  component: Login,
});

function Login() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  if (isAuthenticated()) {
    router.navigate({ to: '/dashboard' });
    return null;
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSignIn = async () => {
    await signIn();
    localStorage.setItem('username', username);
    router.navigate({ to: '/dashboard' });
  };

  return (
    <div className='flex justify-center items-center h-screen bg-blue-400'>
      <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
        <h1 className='text-2xl block text-center font-semibold'>
          <i className="fa-solid fa-user mr-2"></i>Login
        </h1>
        <hr className='mt-3' />
        <div className='mt-3'>
          <label htmlFor='username' className='block text-base mb-2'>Username</label>
          <input 
            type='text' 
            id='username' 
            className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' 
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className='mt-3'>
          <label htmlFor='password' className='block text-base mb-2'>Password</label>
          <div className='flex items-center border w-full text-base px-2 py-1 focus-within:ring-0 focus-within:border-gray-600'>
            <input 
              type={passwordVisible ? 'text' : 'password'} 
              id='password' 
              className='w-full focus:outline-none' 
              placeholder='Enter Password'
            />
            <i 
              className={`fa-solid ${passwordVisible ? 'fa-eye-slash' : 'fa-eye'} cursor-pointer ml-2 text-gray-500`} 
              onClick={togglePasswordVisibility}
            ></i>
          </div>
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div>
            <input type='checkbox' className='mr-2' />
            <label>Remember Me</label>
          </div>
          <div>
            <a href='#' className='text-blue-400 font-semibold'>Forgot Password?</a>
          </div>
        </div>
        <div className='mt-5'>
          <button
            onClick={handleSignIn}
            className='border-2 border-blue-400 bg-blue-400 text-white w-full py-1 rounded-md hover:bg-transparent hover:text-blue-400 font-semibold'
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}