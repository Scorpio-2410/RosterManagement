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
    <div className='flex justify-center items-center h-screen bg-gradient-to-r from-blue-500 to-teal-400'>
      <div className='w-full max-w-md p-8 shadow-lg bg-white rounded-lg'>
        <h1 className='text-3xl block text-center font-semibold mb-6'>
          <i className="fa-solid fa-user mr-2"></i>Login
        </h1>
        <div className='mb-4'>
          <label htmlFor='username' className='block text-base mb-2'>Username</label>
          <input 
            type='text' 
            id='username' 
            className='border w-full text-base px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400' 
            placeholder='Enter Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='password' className='block text-base mb-2'>Password</label>
          <div className='flex items-center border w-full text-base px-4 py-2 rounded-md focus-within:ring-2 focus-within:ring-blue-400'>
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
        <div className='flex justify-between items-center mb-4'>
          <div>
            <input type='checkbox' className='mr-2' />
            <label>Remember Me</label>
          </div>
          <div>
            <a href='#' className='text-blue-500 font-semibold'>Forgot Password?</a>
          </div>
        </div>
        <div>
          <button
            onClick={handleSignIn}
            className='border-2 border-blue-400 bg-blue-400 text-white w-full py-2 rounded-md hover:bg-transparent hover:text-blue-400 font-semibold transition-colors duration-300'
          >
            Sign in
          </button>
        </div>
      </div>
    </div>
  )
}
