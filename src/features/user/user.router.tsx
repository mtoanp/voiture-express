import AdminGuard from "../../core/guards/admin.guard";
import AuthGuard from "../../core/guards/auth.guard";
import NewUser from "./user-create/user-create";
import UserDetails from "./user-detail/user-detail";
import UserList from "./user-list/user-list";
import UpdateUser from "./user-update/user-update";

export const userRoutes = [
  {
    path: "users",
    element: <AuthGuard />, // 🔒 All /users routes require authentication
    children: [
      {
        element: <AdminGuard />, // 🔐 /users (list) is admin-only
        children: [
          {
            index: true, // "/users"
            element: <UserList />,
          },
          {
            path: "", // optional "/users/"
            element: <UserList />,
          },
        ],
      },
      // The rest are protected by AuthGuard only
      { path: ":id", element: <UserDetails /> },
      { path: "new", element: <NewUser /> },
      { path: ":id/edit", element: <UpdateUser /> },
    ],
  },
];
