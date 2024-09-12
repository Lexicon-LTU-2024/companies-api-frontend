import { BASE_URL, CustomError, ITokens } from ".";

export async function loginReq(username: string, password: string): Promise<ITokens> {
  const url = `${BASE_URL}/auth/login`;

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, "Could not login");
  }

  return (await response.json()) as ITokens;
}

export async function refreshTokens(accessToken: string, refreshToken: string): Promise<ITokens> {
  const url: string = `${BASE_URL}/token/refresh`;

  const response: Response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      accessToken: accessToken,
      refreshToken: refreshToken,
    }),
  });

  if (response.ok === false) {
    throw new CustomError(response.status, "Something went wrong with refresh token");
  }

  return (await response.json()) as ITokens;
}
