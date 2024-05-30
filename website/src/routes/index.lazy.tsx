import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/')({
  component: Index,
});

function Index() {
  return (
    <div className="text-white font-inter">
      {/* Hero Section */}
      <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center">
        <div className="max-w-4xl p-8 text-center mt-16">
          <div className="mb-8">
            <h1 className="text-5xl font-bold mb-4">Roster Management System</h1>
            <p className="text-2xl mb-4">Roster with Ease</p>
            <button className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-black transition-colors duration-300">
              Signup Today!
            </button>
            <ul className="mt-6 space-y-2 text-lg text-left mx-auto max-w-md">
              <li className="flex items-center"><span className="text-blue-300 mr-2">✔</span>Efficient Roster Management</li>
              <li className="flex items-center"><span className="text-blue-300 mr-2">✔</span>Intuitive Interface</li>
              <li className="flex items-center"><span className="text-blue-300 mr-2">✔</span>Real-Time Updates</li>
            </ul>
          </div>
          <div className="flex justify-center mt-8">
            <img src="/assets/react.svg" alt="Hero Image" className="max-w-full h-auto" />
          </div>
        </div>
      </div>
      
      {/* Problem Solution Section */}
      <div className="w-full p-8 bg-slate-100">
        <div className="mb-8 flex flex-col lg:flex-row items-center lg:justify-between">
          <div className="lg:w-1/2 p-4">
            <h1 className="text-3xl font-semibold mb-4 text-blue-700">Problem Solution</h1>
            <p className="text-lg text-black">Our solution offers streamlined and effective roster management with real-time updates and user-friendly interfaces.</p>
          </div>
          <div className="lg:w-1/2 p-4">
            <video className="max-w-full h-auto rounded-lg shadow-lg" controls>
              <source src="video.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>
      
      {/* Benefits Section */}
      <div className="w-full p-8 bg-blue-500 text-white">
        <div className="mb-8">
          <h1 className="flex justify-center text-3xl font-semibold mb-4">Benefits</h1>
          <div className="flex justify-around">
            <div className="text-center">
              <div className="text-6xl mb-4">💎</div>
              <h2 className="text-2xl font-bold mb-2">Benefit 1</h2>
              <p className="text-lg">Efficient Roster Management</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">🗺️</div>
              <h2 className="text-2xl font-bold mb-2">Benefit 2</h2>
              <p className="text-lg">Intuitive Interface</p>
            </div>
            <div className="text-center">
              <div className="text-6xl mb-4">✈️</div>
              <h2 className="text-2xl font-bold mb-2">Benefit 3</h2>
              <p className="text-lg">Real-Time Updates</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Testimonials Section */}
      <div className="w-full p-8 bg-slate-100">
        <div className="mb-8">
          <h1 className="flex justify-center text-3xl font-semibold mb-4 text-blue-700">Testimonials</h1>
          <div className="flex justify-around text-blue-500">
            <div className="text-center">
              <p className="text-lg">"Easy to use"</p>
              <p className="text-blue-500 font-bold">John Doe</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
            <div className="text-center">
              <p className="text-lg">"Awesome!"</p>
              <p className="text-blue-500 font-bold">Jane Doe</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
            <div className="text-center">
              <p className="text-lg">"Great!"</p>
              <p className="text-blue-500 font-bold">Jim Doe</p>
              <p className="text-yellow-500">★★★★★</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Features Section */}
      <div className="w-full p-8 bg-blue-500 text-white">
        <div className="mb-8">
          <h1 className="flex justify-center text-3xl font-semibold mb-4">Features</h1>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Automated Scheduling</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Real-Time Notifications</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Comprehensive Reporting</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>User-Friendly Interface</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Mobile Access</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Data Security</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Customizable Templates</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>24/7 Support</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Integration with Other Tools</div>
            <div className="flex items-center justify-center"><span className="text-green-500 mr-2">✔</span>Scalable Solutions</div>
          </div>
        </div>
      </div>
      
      {/* FAQs Section */}
      <div className="w-full p-8 bg-slate-100">
        <div className="mb-8">
          <h1 className="flex justify-center text-3xl font-semibold mb-4 text-blue-700">FAQs</h1>
          <div className="space-y-4 text-blue-500">
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold cursor-pointer">What is the Roster Management System?</summary>
              <p className="mt-2">The Roster Management System is a comprehensive solution for managing employee schedules, leaves, and tasks efficiently.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold cursor-pointer">How does it improve efficiency?</summary>
              <p className="mt-2">It automates scheduling, provides real-time updates, and offers intuitive tools for both managers and employees.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold cursor-pointer">Is there a mobile app?</summary>
              <p className="mt-2">Yes, the system includes a mobile app for easy access to schedules and notifications on the go.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold cursor-pointer">Can it integrate with other tools?</summary>
              <p className="mt-2">Yes, it can integrate with various tools to enhance its functionality and provide a seamless experience.</p>
            </details>
            <details className="bg-white p-4 rounded shadow">
              <summary className="font-semibold cursor-pointer">What kind of support is available?</summary>
              <p className="mt-2">We offer 24/7 support to assist with any issues or questions you may have.</p>
            </details>
          </div>
        </div>
      </div>
      
      {/* Sign Up Section */}
      <div className="w-full p-8 bg-blue-500 text-white">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-semibold mb-4">Sign Up</h1>
          <p className="text-lg">Join us by signing up today!</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-black mt-4 transition-colors duration-300"
          >
            Back to Top
          </button>
        </div>
      </div>
    </div>
  )
}
