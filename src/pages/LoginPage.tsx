import { FormEventHandler, ReactElement, useState } from "react";
import { useAuthContext } from "../hooks";
import { Navigate, useNavigate } from "react-router-dom";

export function LoginPage(): ReactElement {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const { isLoggedIn, login } = useAuthContext();
  const navigate = useNavigate();

  if (isLoggedIn) {
    return <Navigate to="/" replace />;
  }

  const handleOnSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();

    await login(username, password);
    navigate("/");
  };

  return (
    <main id="login-page" className="g-container">
      <form className="login-form" onSubmit={handleOnSubmit}>
        <fieldset>
          <legend>Login</legend>
          <label htmlFor="username">Username</label>
          <input
            id="username"
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            value={username}
          />
          <label htmlFor="password">Password</label>
          <input
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            value={password}
          />
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </main>
  );
}
