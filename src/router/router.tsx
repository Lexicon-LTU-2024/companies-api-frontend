import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Companies, RequireAuth } from "../components";
import { LoginPage, StartPage } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route element={<RequireAuth children={<StartPage />} />}>
        <Route element={<Companies />} index />
      </Route>
      <Route element={<LoginPage />} path="/login" />
    </>
  )
);
