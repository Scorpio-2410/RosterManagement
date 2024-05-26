import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/login')({
  component: Login,
})

function Login(){
  return(
    <div className='flex justify-center items-center h-screen bg-blue-400'>
      <div className='w-96 p-6 shadow-lg bg-white rounded-md'>
        <h1 className='text-2xl block text-center font-semibold'><i className="fa-solid fa-user mr-2"></i>Login</h1>
        <hr className='mt-3'/>
        <div className='mt-3'>
          <label form='username' className='block text-base mb-2'>Username</label>
          <input type='text' id='Username' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter Username'/>
        </div>
        <div className='mt-3'>
          <label form='password' className='block text-base mb-2'>Password</label>
          <input type='text' id='Password' className='border w-full text-base px-2 py-1 focus:outline-none focus:ring-0 focus:border-gray-600' placeholder='Enter Password'/>
        </div>
        <div className='mt-3 flex justify-between items-center'>
          <div>
            <input type='checkbox' className='mr-2'/>
            <label>Remember Me</label>
          </div>
          <div>
            <a href='#' className='text-blue-400 font-semibold'>Forgot Password?</a>
          </div>
        </div>
        <div className='mt-5'>
          <button type='submit' className='border-2 border-blue-400 bg-blue-400 text-white w-full py-1 rounded-md hover:bg-transparent hover:text-blue-400 font-semibold'>Login</button>
        </div>
      </div>
    </div>
  )
}