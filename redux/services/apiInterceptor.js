import { clearAuth, clearUserDetails } from "../slices/authSlice";
import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { BASE_URL, ERROR_MESSAGES } from "@/lib/constants";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
});

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  //console.log("reult :",result)
  if (result?.error?.status === 401) {
    const explanation = result?.error?.data?.explanation?.[0];
    if (explanation === ERROR_MESSAGES.ACCESS_TOKEN_EXPIRED) {
      const refreshResult = await baseQuery(
        { url: "auth/refresh", method: "POST" },
        api,
        extraOptions
      );
      if (refreshResult?.data) {
        result = await baseQuery(args, api, extraOptions);
      } else {
        api.dispatch(clearAuth());
      }
    } else {
      api.dispatch(clearAuth());
    }
  }

  return result;
};
