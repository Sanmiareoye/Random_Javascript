import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NotFoundPage from "./components/notFound.jsx";
import Dashboard from "./components/dashboard.jsx";
import DashboardItems from "./components/dasboardItems.jsx";
import Counter from "./components/counter.jsx";
import Todo from "./components/todoList.jsx";
import Form from "./components/simpleForm.jsx";
import ColorChanger from "./components/colorChanger.jsx";
import Clock from "./components/clock.jsx";
import Sizer from "./components/windowSizer.jsx";
import Title from "./components/titleUpdate.jsx";
import Countdown from "./components/countdown.jsx";
import Globee from "./components/globe.jsx";
import ThemeProvider from "./context/themeContext.jsx";
import { AuthProvider } from "./context/authContext.jsx";
import SimilarityChecker from "./components/similarityChecker.jsx";
import HandTracker1 from "./components/webCam2.jsx";
import Css from "./components/cssTut.jsx";

const router = createBrowserRouter([
  { path: "/app", element: <App /> },
  { path: "/dashboard", element: <Dashboard /> },
  { path: "*", element: <NotFoundPage /> },
  { path: "/dashboard/:id", element: <DashboardItems /> },
  { path: "/counter", element: <Counter /> },
  { path: "/todo", element: <Todo /> },
  { path: "/form", element: <Form /> },
  { path: "/colorchange", element: <ColorChanger /> },
  { path: "/clock", element: <Clock /> },
  { path: "/sizer", element: <Sizer /> },
  { path: "/title", element: <Title /> },
  { path: "/countdown", element: <Countdown /> },
  { path: "/globe", element: <Globee /> },
  { path: "/nails", element: <SimilarityChecker /> },
  { path: "/webcam", element: <HandTracker1 /> },
  { path: "/css", element: <Css /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthProvider>
  </StrictMode>
);
