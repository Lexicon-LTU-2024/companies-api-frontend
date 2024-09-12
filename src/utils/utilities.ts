import { jwtDecode } from "jwt-decode";

export function addTokenToRequestInit(accessToken?: string, options?: RequestInit): RequestInit {
  const requestObject: RequestInit = { ...options };

  if (accessToken) {
    requestObject.headers = { ...options?.headers, Authorization: `Bearer ${accessToken}` };
  }

  return requestObject;
}

export function hasTokenExpired(token: string): boolean {
  if (!token) return true;

  const decoded = jwtDecode(token);
  const expire = decoded.exp! * 1000; // * 1000 to get time in milliseconds.
  const currentTimestamp = Date.now();

  return expire < currentTimestamp;
}
