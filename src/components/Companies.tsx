import { ReactElement, useEffect } from "react";
import { BASE_URL, ICompany } from "../utils";
import { useFetchWithToken } from "../hooks";

export function Companies(): ReactElement {
  const {
    data: companies,
    error,
    isLoading,
    requestFunc,
  } = useFetchWithToken<ICompany[]>(`${BASE_URL}/companies`);

  useEffect(() => {
    requestFunc();
  }, []);

  if (isLoading === true) {
    return <p>Loading...</p>;
  }

  return (
    <section className="companies">
      {companies ? (
        companies.map((c) => (
          <div key={c.id}>
            <p>{c.name}</p>
          </div>
        ))
      ) : (
        <p>No companies</p>
      )}
    </section>
  );
}
