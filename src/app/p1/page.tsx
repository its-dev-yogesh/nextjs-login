"use client";
import useAuthStore from "@/stores/auth.store";
import React from "react";

type Props = {};

function page({}: Props) {
  const { user } = useAuthStore();
  return <div>page 1 : {user ? JSON.stringify(user) : ""}</div>;
}

export default page;
