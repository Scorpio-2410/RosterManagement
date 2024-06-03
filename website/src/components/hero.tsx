function Hero() {
  return (
    <div className="h-screen bg-gradient-to-r from-blue-500 to-teal-400 flex flex-col items-center">
      <div className="max-w-4xl p-8 text-center mt-16">
        <div className="mb-8">
          <h1 className="text-5xl font-bold mb-4">Roster Management System</h1>
          <p className="text-2xl mb-4">Roster with Ease</p>
          <button className="bg-slate-700 text-white font-semibold px-6 py-2 rounded-full hover:bg-black transition-colors duration-300">
            Signup Today!
          </button>
          <ul className="mt-6 space-y-2 text-lg text-left mx-auto max-w-md">
            <li className="flex items-center">
              <span className="text-blue-300 mr-2">✔</span>Efficient Roster
              Management
            </li>
            <li className="flex items-center">
              <span className="text-blue-300 mr-2">✔</span>Intuitive Interface
            </li>
            <li className="flex items-center">
              <span className="text-blue-300 mr-2">✔</span>Real-Time Updates
            </li>
          </ul>
        </div>
        <div className="flex justify-center mt-8">
          <img
            src="/assets/react.svg"
            alt="Hero Image"
            className="max-w-full h-auto"
          />
        </div>
      </div>
    </div>
  );
}

export default Hero;
