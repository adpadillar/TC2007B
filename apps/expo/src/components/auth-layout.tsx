import React from "react";
import { Redirect, usePathname } from "expo-router";
import { SignedIn, SignedOut } from "@clerk/clerk-expo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        {pathname !== "/login" && <Redirect href="/login" />}
      </SignedOut>
    </>
  );
}
