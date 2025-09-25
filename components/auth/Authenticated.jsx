"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

const Authenticated = ({ children }) => {
  const router = useRouter();
  const path = usePathname();
  const { user , isAuthenticated } = useSelector((state) => state.auth);
  

  useEffect(() => {
    console.log(" user ",user," isAuthenticated ",isAuthenticated)
    if (isAuthenticated && !user) {
      // console.log("inside one")
      router.push(`/sign-in?path=${path}`);
    }
   else if(!isAuthenticated && !user){
    // console.log("inside two") 
    router.replace("/sign-in");
   }
 
  }, [isAuthenticated, path, router,user]);

  if (!isAuthenticated) return null;

  return children;
};

export default Authenticated;
