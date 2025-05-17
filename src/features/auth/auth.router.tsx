// import { LogIn, Register, ForgotPassword, ResetPassword } from "../pages";
import AuthLayout from "./auth-layout";
import LogIn from "./login/login";
import Register from "./register/register";

export const authRoutes = [
  {
    path: "/auth",
    element: <AuthLayout />,
    children: [
      { path: "login", element: <LogIn /> },
      { path: "register", element: <Register /> },
      // { path: "forgot-password", element: <ForgotPassword /> },
      // { path: "reset-password", element: <ResetPassword /> },
      { index: true, element: <LogIn /> }, // default /auth shows login
    ],
  },
];
