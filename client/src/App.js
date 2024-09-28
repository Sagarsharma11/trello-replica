import React from "react";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Header from './components/Header';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from "./pages/Signup";
import { TaskProvider } from "./context/TaskContext";
import withAuth from './auth/withAuth'; // Import the HOC

// Protect the Home route
const ProtectedHome = withAuth(Home);

// Create the router with routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <Header />
        {<ProtectedHome/>}  {/* Protecting the Home route */}
      </div>
    ),
  },
  {
    path: "/login",
    element: (
      <div>
        <Header />
        <Login />
      </div>
    ),
  },
  {
    path: "/signup",
    element: (
      <div>
        <Header />
        <Signup />
      </div>
    ),
  },
]);

// Render the application using RouterProvider
const App = () => {
  return (
    <TaskProvider>
      <RouterProvider router={router} />
    </TaskProvider>
  );
};

export default App;
