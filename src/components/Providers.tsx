import { ReactElement } from "react";
import { AuthProvider } from "../context/authProvider";
import { RouterProvider } from "react-router-dom";
import { router } from "../router";

export function Providers(): ReactElement {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}
