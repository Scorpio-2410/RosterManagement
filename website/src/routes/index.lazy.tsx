import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  return (
    <div className='text-white'>
      <div className='h-screen bg-blue-400 flex flex-col items-center'>
        <div className='max-w-4xl p-8 text-center mt-16'>
          <div className='mb-8'>
            <h1 className='text-4xl font-bold mb-4'>Roster Management System</h1>
            <p className='text-xl mb-4'>Roster with Ease</p>
            <button className='bg-slate-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-black'>
              Signup Today!
            </button>
            <ul className='mt-6 space-y-2 text-lg text-left'>
              <li className='flex items-center'><span className='text-blue-300 mr-2'>✔</span>Result 1</li>
              <li className='flex items-center'><span className='text-blue-300 mr-2'>✔</span>Result 2</li>
              <li className='flex items-center'><span className='text-blue-300 mr-2'>✔</span>Result 3</li>
            </ul>
          </div>
          <div className='flex justify-center mt-8'>
            <img src="/assets/react.svg" alt="Hero Image" className='max-w-full h-auto' />
          </div>
        </div>
      </div>

      <div className='w-full p-8 bg-slate-300'>
        <div className='mb-8 flex flex-col lg:flex-row items-center lg:justify-between'>
          <div className='lg:w-1/2 p-4'>
            <h1 className='text-3xl font-semibold mb-4 text-blue-400'>Problem Solution</h1>
            <p className='text-lg text-black'>Solution points</p>
          </div>
          <div className='lg:w-1/2 p-4'>
            <video className='max-w-full h-auto' controls>
              <source src="video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <div className='w-full p-8 bg-blue-400'>
        <div className='mb-8'>
          <h1 className='flex justify-center text-3xl font-semibold mb-4'>Benefits</h1>
          <div className='flex justify-around'>
            <div className='text-center'>
              <div className='text-6xl mb-4'>💎</div>
              <h2 className='text-2xl font-bold mb-2'>Benefit 1</h2>
              <p className='text-lg'>Benefit 1</p>
            </div>
            <div className='text-center'>
              <div className='text-6xl mb-4'>🗺️</div>
              <h2 className='text-2xl font-bold mb-2'>Benefit 2</h2>
              <p className='text-lg'>Benefit 2</p>
            </div>
            <div className='text-center'>
              <div className='text-6xl mb-4'>✈️</div>
              <h2 className='text-2xl font-bold mb-2'>Benefit 3</h2>
              <p className='text-lg'>Benefit 3</p>
            </div>
          </div>
        </div>
      </div>
      <div className='w-full p-8 bg-slate-300'>
        <div className='mb-8'>
          <h1 className='flex justify-center text-3xl font-semibold mb-4'>Testimonials</h1>
          <div className='flex justify-around'>
            <div className='text-center'>
              <p className='text-lg'>"Easy to use"</p>
              <p className='text-blue-400 font-bold'>John Doe</p>
              <p className='text-yellow-500'>★★★★★</p>
            </div>
            <div className='text-center'>
              <p className='text-lg'>"Awesome!"</p>
              <p className='text-blue-400 font-bold'>John Doe</p>
              <p className='text-yellow-500'>★★★★★</p>
            </div>
            <div className='text-center'>
              <p className='text-lg'>"Great!"</p>
              <p className='text-blue-400 font-bold'>John Doe</p>
              <p className='text-yellow-500'>★★★★★</p>
            </div>
          </div>
        </div>
      </div>

      <div className='w-full p-8 bg-blue-400'>
        <div className='mb-8'>
          <h1 className='flex justify-center text-3xl font-semibold mb-4'>Here Are the Features!</h1>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 1</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 2</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 3</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 4</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 5</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 6</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 7</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 8</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 9</div>
            <div className='flex items-center justify-center'><span className='text-green-500 mr-2'>✔</span>Feature 10</div>
          </div>
        </div>
      </div>
      <div className='w-full p-8 bg-slate-300'>
        <div className='mb-8'>
          <h1 className='flex justify-center text-3xl font-semibold mb-4'>FAQs</h1>
          <div className='space-y-4'>
            <details className='bg-black p-4 rounded shadow'>
              <summary className='font-semibold cursor-pointer'>What's the question?</summary>
              <p className='mt-2'>Here's the answer to the question.</p>
            </details>
            <details className='bg-black p-4 rounded shadow'>
              <summary className='font-semibold cursor-pointer'>What's the question?</summary>
              <p className='mt-2'>Here's the answer to the question.</p>
            </details>
            <details className='bg-black p-4 rounded shadow'>
              <summary className='font-semibold cursor-pointer'>What's the question?</summary>
              <p className='mt-2'>Here's the answer to the question.</p>
            </details>
            <details className='bg-black p-4 rounded shadow'>
              <summary className='font-semibold cursor-pointer'>What's the question?</summary>
              <p className='mt-2'>Here's the answer to the question.</p>
            </details>
            <details className='bg-black p-4 rounded shadow'>
              <summary className='font-semibold cursor-pointer'>What's the question?</summary>
              <p className='mt-2'>Here's the answer to the question.</p>
            </details>
          </div>
        </div>
      </div>
      <div className='w-full p-8 bg-blue-400'>
        <div className='mb-8 text-center'>
          <h1 className='text-3xl font-semibold mb-4'>SignUp</h1>
          <p className='text-lg'>Join us by signing up today!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className='bg-slate-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-black mt-4'
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}