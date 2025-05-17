import App from "./app2";
import { Home, NotFound } from "../features/index";
import { authRoutes } from "../features/auth/auth.router";
import { userRoutes } from "../features/user/user.router";

const appRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> }, // Render Home component when URL is '/'
      ...authRoutes,
      ...userRoutes,
    ],
  },
];

// Create & Export router as an instantiated object
import { createBrowserRouter } from "react-router-dom";
export const router = createBrowserRouter(appRoutes);
