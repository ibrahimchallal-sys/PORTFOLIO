import { lazy, Suspense } from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import Loading from "../components/ui/loading/Loading";
const Home = lazy(() => import("../pages/Home"));
const Main = lazy(() => import("../layouts/Main"));

// Get the basename for different deployment environments
const getBasename = () => {
  // For Vercel and other hosting platforms
  if (import.meta.env.VITE_VERCEL_ENV === 'production' || import.meta.env.VITE_VERCEL_ENV === 'preview') {
    return '/';
  }
  // For GitHub Pages
  const repoName = import.meta.env.VITE_REPO_NAME || "PORTFOLIO";
  return import.meta.env.MODE === 'production' ? `/${repoName}` : '/';
};

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: (
        <Suspense fallback={<Loading />}>
          <Main />
        </Suspense>
      ),
      children: [
        {
          index: true,
          element: <Navigate to="/home" replace />,
        },
        {
          path: "home",
          element: <Home></Home>,
        },
        {
          path: "*",
          element: <Navigate to="/home" replace />,
        },
      ],
    },
  ],
  { basename: getBasename() }
);