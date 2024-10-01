import {
  createBrowserRouter,
  redirect,
  RouterProvider,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/login/Login";
import { Contacts } from "./pages/contacts/Contacts";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/contacts",
    element: <Contacts />,
  },
  {
    path: "/",
    loader: () => redirect("/login"),
  },
]);

function App() {
  return <RouterProvider router={router}></RouterProvider>;
}

export default App;
