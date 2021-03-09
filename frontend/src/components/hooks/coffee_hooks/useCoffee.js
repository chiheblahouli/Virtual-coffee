import React from "react";
import axios from "axios";
import { useQuery, queryCache } from "react-query";

export const fetchCoffee = (coffeeId) =>
  axios
    .get(`http://localhost:5000/api/coffee/fetch/${coffeeId}`)
    .then((res) => res.data);

export default function useBusiness(coffeeId) {
  return useQuery(["Coffee", coffeeId], () => fetchCoffee(coffeeId), {
    initialData: () => {
      return queryCache.getQueryData("coffee")?.find((d) => d.id == coffeeId);
    },
    initialStale: true,
    refetchInterval: 5000,
  });
}
