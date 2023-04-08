import { useState, useEffect } from "react";

const useFetchItems = (endpoint = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      fetch(process.env.REACT_APP_BACKEND_HOST + endpoint)
        .then((res) => {
          if (!res.ok) {
            throw new Error("Error occured");
          }

          return res.json();
        })
        .then((data) => setData(data))
        .catch((e) => setError(e?.message ?? "Error occured"))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [endpoint]);

  return [data, isLoading, error];
};

export default useFetchItems;
