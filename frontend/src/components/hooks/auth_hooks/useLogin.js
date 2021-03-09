import axios from "axios";
import { useMutation, useQuery, useQueryCache, queryCache } from "react-query";

// function useLogin2(email, password) {
//   const config = {
//     headers: { "Content-type": "application/json" },
//   };
//   const body = JSON.stringify({ email, password });
//   return useQuery(
//     "token",
//     () => axios.post("/api/auth", body, config),
//     {
//       refetchOnWindowFocus: false,
//       enabled: false, // turned off by default, manual refetch is needed
//     }
//   );
// }
export default function useLogin(email, password) {
  const config = {
    headers: { "Content-type": "application/json" },
  };
  const body = JSON.stringify({ email, password });
  return useMutation(
    () =>
      axios.post("http://localhost:5000/api/auth", body, config).then((res) => {
        //console.log(res.data.token);
        localStorage.setItem("token", res.data.token);
        console.log("test", res);
        return res.data;
      }),
    {
      onSuccess: () => {
        queryCache.invalidateQueries("user");
        // console.log("sucess");
      },
    }
  );
}

// const login = ({ email, password }) => {
//   const config = {
//     headers: { "Content-type": "application/json" },
//   };
//   const body = JSON.stringify({ email, password });
// };
