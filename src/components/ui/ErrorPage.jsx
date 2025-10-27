import React from "react";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <div className="text-center p-8 bg-white rounded-lg shadow-lg max-w-md">
        <h1 className="text-3xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
        <p className="text-gray-700 mb-6">
          We're sorry, but it seems there was an error loading the page.
        </p>
        <button
          onClick={() => window.location.reload()}
          className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          Reload Page
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;