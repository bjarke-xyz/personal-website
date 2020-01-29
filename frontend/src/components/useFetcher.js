import { useState, useEffect } from "react";

export const useFetcher = fetchFn => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const loadData = () => {
    setLoading(true);
    fetchFn()
      .then(data => setData(data))
      .finally(() => setLoading(false))
      .catch(err => setError(err));
  };

  useEffect(() => {
    loadData();
  }, [fetchFn]);

  return [data, loading, error];
};
