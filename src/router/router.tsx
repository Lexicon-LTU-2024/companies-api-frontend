import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { Companies, RequireAuth } from "../components";
import { LoginPage, StartPage } from "../pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* <Route
        element={
          <RequireAuth>
            <StartPage />
          </RequireAuth>
        }
        path="/"
      ></Route> */}
      <Route element={<RequireAuth children={<StartPage />} />} path="/">
        <Route element={<Companies />} index />
      </Route>
      <Route element={<LoginPage />} path="/login" />
    </>
  )
);
