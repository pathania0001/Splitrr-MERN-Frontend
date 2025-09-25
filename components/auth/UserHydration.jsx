"use client";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useGetCurrUserQuery } from "@/redux/services";
import { setUserDetails } from "@/redux/slices/authSlice";
import { ERROR_MESSAGES } from "@/lib/constants";
import { useRouter } from "next/navigation";

export default function CurrentUser({ children }) {
    const router = useRouter();
  const { data, isSuccess,isError,error } = useGetCurrUserQuery(undefined, {
    skip: typeof window === "undefined",
  });
  const dispatch = useDispatch();
  if(isError)
  {
    if(error.status === "401"){
        if(error.data.explanation === ERROR_MESSAGES.TOKEN_EXPIRED)
            router.push('/sign-in')
    }
  }
  useEffect(() => {
    if (isSuccess && data?.data) {
      dispatch(setUserDetails({
        id: data.data._id,
        name: data.data.name,
        email: data.data.email
      }));
    }
  }, [isSuccess, data, dispatch]);

  return <>{children}</>;
}

