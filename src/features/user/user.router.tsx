// import { UserList, NewUser, EditUser, UserDetails } from "../pages";

import NewUser from "./user-create/user-create";
import UserDetails from "./user-detail/user-detail";
import UserList from "./user-list/user-list";
import UpdateUser from "./user-update/user-update";

export const userRoutes = [
  {
    path: "/users",
    children: [
      {
        index: true, // this means "/users"
        element: <UserList />,
      },
      {
        path: "", // optional fallback for "/users"
        element: <UserList />,
      },
    ],
  },
  { path: "users/:id", element: <UserDetails /> },
  { path: "users/new", element: <NewUser /> },
  { path: "users/:id/edit", element: <UpdateUser /> },
  // { index: true, element: <UserList /> }, // default /auth shows login
];
