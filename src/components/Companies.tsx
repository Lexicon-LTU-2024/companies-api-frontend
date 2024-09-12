import { ReactElement, useEffect } from "react";
import { useFetchWithToken } from "../hooks";
import { BASE_URL, ICompany } from "../utils";

export function Companies(): ReactElement {
  const {
    data: companies,
    isLoading,
    requestFunc,
  } = useFetchWithToken<ICompany[]>(`${BASE_URL}/companies`);

  useEffect(() => {
    requestFunc();
  }, []);

  if (isLoading) {
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
        <p>No companies...</p>
      )}
    </section>
  );
}
