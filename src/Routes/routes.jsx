import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../Layouts/MainLayout";
import TodoPage from "../Pages/TodoPage/TodoPage";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <TodoPage />,
      },
      {
        path: "/login",
        element: <div>Login</div>,
      },
      {
        path: "/register",
        element: <div>Register</div>,
      },
    ],
  },
  {
    path: "/dashboard",
    element: <div>Dashboard</div>,
    children: [
      {
        path: "/dashboard/admin",
        element: <div>Admin</div>,
      },
    ],
  },
]);
