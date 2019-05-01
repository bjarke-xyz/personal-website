import React from "react";
import { useFetcher } from "./useFetcher";

export const Fetcher = ({ action, children }) => {
  const [data, loading, error] = useFetcher(action);

  if (loading) return <p>loading...</p>;
  if (error) return <p>error!</p>;

  if (!data) return null;

  return children(data);
};
