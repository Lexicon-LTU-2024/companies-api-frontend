import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Companies } from "../components";
import { LoginPage, StartPage } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<StartPage />} path="/">
        <Route element={<Companies />} index />
      </Route>
      <Route element={<LoginPage />} path="/login" />
    </>
  )
);
