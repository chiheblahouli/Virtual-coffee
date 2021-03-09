import axios from "axios";
import { useMutation, useQuery, useQueryCache, queryCache } from "react-query";

export default function useLogin2() {
  //
  axios.defaults.headers.common["x-auth-token"] = localStorage.token;
  return useQuery(
    "user",
    () => axios.get("http://localhost:5000/api/auth"),
    {}
  );
}
