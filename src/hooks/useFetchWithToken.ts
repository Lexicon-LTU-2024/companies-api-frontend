import { useState } from "react";
import { useLocalStorage } from "usehooks-ts";
import { addTokenToRequestInit, hasTokenExpired, ITokens, refreshTokens, TOKENS } from "../utils";
import { CustomError } from "../utils/classes";

interface IUseFetchReturn<T> {
  data: T | null;
  error: CustomError | null;
  isLoading: boolean;
  requestFunc: () => Promise<void>;
}

export function useFetchWithToken<T>(
  url: RequestInfo | URL,
  options?: RequestInit
): IUseFetchReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [tokens, setTokens] = useLocalStorage<ITokens | null>(TOKENS, null);
  const [error, setError] = useState<CustomError | null>(null);

  // This function is generated based on the parameters to the useFetchWithToken and it's used internally by the requestFunc.
  async function generatedFetch<T>(accessToken: string): Promise<T | undefined> {
    const requestInit: RequestInit = addTokenToRequestInit(accessToken, options);
    const response: Response = await fetch(url, requestInit);

    if (response.ok === false) {
      throw new CustomError(response.status, response.statusText);
    }

    return (await response.json()) as T;
  }

  // This is the function that is exported from this hook and can be used inside the component that implements useFetchWithToken.
  async function requestFunc() {
    setError(null);
    setIsLoading(true);

    const tokenIsExpired = hasTokenExpired(tokens!.accessToken);

    if (tokenIsExpired) {
      await refreshTokens(tokens!.accessToken, tokens!.refreshToken)
        .then((refreshedTokens) => {
          setTokens(refreshedTokens);
          return refreshedTokens;
        })
        .then(async (refreshedTokens) => {
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

  return { data, error, isLoading, requestFunc };
}
