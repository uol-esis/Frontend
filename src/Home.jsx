import { useNavigate } from "react-router-dom";
import arrow from './assets/arrow-right.svg';

function Home() {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center  p-6 mt-10">
      <div className="w-full max-w-md  backdrop-blur-sm border border-gray-200 rounded-2xl shadow-xl p-8 text-center">
        <div className="flex flex-col items-center gap-4">

          <h1 className="text-2xl font-semibold text-gray-800">Get Started</h1>
          <p className="text-sm text-gray-500">
            Begin the application process!
          </p>

          <button
            onClick={() => navigate('/upload')}
            className="mt-4 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-full shadow-md hover:scale-105 transform transition-transform focus:outline-none focus:ring-4 focus:ring-blue-200"
            aria-label="Start the application and begin uploading your files"
          >
            <span className="font-medium text-lg">Start Application</span>
            <img src={arrow} alt="" className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default Home;
