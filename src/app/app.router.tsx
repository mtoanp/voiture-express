import App from "./app";
import { Home, NotFound, Profile } from "../features/index";
import { authRoutes } from "../features/auth/auth.router";
import { userRoutes } from "../features/user/user.router";

const appRoutes = [
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { path: "", element: <Home /> }, // Render Home component when URL is '/'
      {
        element: <AuthGuard />,
        children: [{ path: "profile", element: <Profile /> }],
      },
      ...authRoutes,
      ...userRoutes,
    ],
  },
];

// Create & Export router as an instantiated object
import { createBrowserRouter } from "react-router-dom";
import AuthGuard from "../features/auth/auth.guard";
export const router = createBrowserRouter(appRoutes);
