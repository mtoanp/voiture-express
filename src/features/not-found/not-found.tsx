import "./not-found.scss";

import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h2 className="text-4xl font-bold text-red-600 mb-4">404 - Page Not Found</h2>
      <p className="text-lg text-gray-700 mb-6">Sorry, the page you’re looking for doesn’t exist.</p>
      <Link to="/" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition duration-200">
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
