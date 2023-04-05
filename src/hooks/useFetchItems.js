import { useState, useEffect } from "react";
import axios from "axios";

const useFetchItems = (endpoint = "") => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);

      axios
        .get(process.env.REACT_APP_BACKEND_HOST + endpoint)
        .then(({ data }) => setData(data))
        .catch((e) => setError(e?.message ?? "Error occured"))
        .finally(() => setIsLoading(false));
    };

    fetchData();
  }, [endpoint]);

  return [data, isLoading, error];
};

export default useFetchItems;
