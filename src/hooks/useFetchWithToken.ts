import { useState } from "react";
import {
  addTokenToRequestInit,
  CustomError,
  hasTokenExpired,
  ITokens,
  refreshTokens,
  TOKENS,
} from "../utils";
import { useLocalStorage } from "usehooks-ts";

interface IUseFetchWithTokenReturn<T> {
  data: T | null;
  error: CustomError | null;
  isLoading: boolean;
  requestFunc: () => void;
}

export function useFetchWithToken<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): IUseFetchWithTokenReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useLocalStorage<ITokens | null>(TOKENS, null);
  const [error, setError] = useState<CustomError | null>(null);

  // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
  async function generatedFetch<T>(accessToken: string): Promise<T> {
    const requestInit: RequestInit = addTokenToRequestInit(accessToken, options);
    const response: Response = await fetch(url, requestInit);

    if (response.ok === false) {
      throw new CustomError(response.status, response.statusText);
    }

    return (await response.json()) as T;
  }

  async function requestFunc() {
    setError(null);
    setIsLoading(true);

    const tokenIsExpired: boolean = hasTokenExpired(tokens!.accessToken);

    if (tokenIsExpired) {
      // Ask api to refresh token before fetching the data.
      console.log("Token is expired:", tokenIsExpired);

      await refreshTokens(tokens!.accessToken, tokens!.refreshToken)
        .then(async (refreshedTokens) => {
          setTokens(refreshedTokens);
          return await generatedFetch<T>(refreshedTokens.accessToken);
        })
        .then((data) => {
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          if (error instanceof CustomError) {
            setError(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      // Just fetch the data right away

      await generatedFetch<T>(tokens!.accessToken)
        .then((data) => {
          if (data) {
            setData(data);
          }
        })
        .catch((error) => {
          if (error instanceof CustomError) {
            setError(error);
          }
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }

  return { data, isLoading, error, requestFunc };
}
