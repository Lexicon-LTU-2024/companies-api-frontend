import { ReactElement } from "react";
import { Outlet } from "react-router-dom";

export function StartPage(): ReactElement {
  return (
    <main id="start-page" className="g-container">
      <h1>Start Page</h1>
      <Outlet />
    </main>
  );
}
