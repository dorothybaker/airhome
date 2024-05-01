import Navbar from "./components/Navbar";
import Accommodations from "./pages/Accommodations";
import Bookings from "./pages/Bookings";
import Home from "./pages/Home";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import NewPlace from "./pages/NewPlace";
import SinglePlace from "./pages/SinglePlace";
import Footer from "./components/Footer";

function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/bookings", element: <Bookings /> },
        { path: "/accommodations", element: <Accommodations /> },
        { path: "/accommodations/new", element: <NewPlace /> },
        { path: "/accommodations/:id", element: <SinglePlace /> },
      ],
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
