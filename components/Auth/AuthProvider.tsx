"use client";
import React, { ReactElement } from "react";
import { SessionProvider } from "next-auth/react";
type Props = {
  children: ReactElement;
};

function AuthProvider({ children }: Props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
