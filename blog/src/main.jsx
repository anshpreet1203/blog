import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router";
import { Children } from "react";
import Home from "./pages/Home.jsx";
import Blogs from "./pages/Blogs.jsx";
import Services from "./pages/Services.jsx";
import About from "./pages/About.jsx";
import Contact from "./pages/Contact.jsx";
import SingleBlog from "./components/SingleBlog.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/blogs", element: <Blogs /> },
      { path: "/services", element: <Services /> },
      { path: "/about", element: <About /> },
      { path: "/contact", element: <Contact /> },
      {
        path: "/blogs/:id",
        element: <SingleBlog />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/blogs/${params.id}`),
      },
    ],
  },
]);
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
