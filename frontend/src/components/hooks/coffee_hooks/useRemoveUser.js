import axios from "axios";
import { useMutation } from "react-query";

import { useQuery, useQueryCache, queryCache } from "react-query";

export default function useUpdateBusiness(
  type = "remove",
  coffeeId,
  tableName
) {
  const cache = useQueryCache();

  const config = {
    headers: { "Content-type": "application/json" },
  };
  const body = JSON.stringify({ type });
  return useMutation(
    () =>
      axios
        .post(
          `http://localhost:5000/api/coffee/add-or-remove-user/${coffeeId}/${tableName}`,
          body,
          config
        )
        .then((res) => {
          return res.data;
        }),
    {
      onSuccess: () => {
        cache.invalidateQueries("myCoffee");
      },
    }
  );
}
