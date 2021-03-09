import axios from "axios";
import { useQuery, queryCache } from "react-query";

export default function useAllCoffees() {
  return useQuery(
    "allCoffee",
    () =>
      axios.get("http://localhost:5000/api/coffee/all").then((res) => res.data),
    { refetchInterval: 5000 }
  );
}
