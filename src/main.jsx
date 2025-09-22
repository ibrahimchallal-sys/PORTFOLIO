import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { router } from "./routes/Router";
import { RouterProvider } from "react-router-dom";
import "../index.css";
import './i18n';
import Preloader from "./components/ui/Preloader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <Preloader isLoading={isLoading} setIsLoading={setIsLoading} />
      {!isLoading && (
        <React.StrictMode>
          <RouterProvider router={router} />
        </React.StrictMode>
      )}
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")).render(<App />);