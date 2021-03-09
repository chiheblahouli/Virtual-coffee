import axios from "axios";
import { useMutation } from "react-query";

import { useQueryCache } from "react-query";

export default function useUpdateBusiness(type = "add", coffeeId, tableName) {
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
