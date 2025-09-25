"use client";

import Authenticated from "@/components/auth/Authenticated";
import React from "react";

const MainLayout = ({ children }) => {
  return (
    <Authenticated>
      <div className="container mx-auto mt-20 mb-20 px-4">{children}</div>
    </Authenticated>
  );
};

export default MainLayout;
