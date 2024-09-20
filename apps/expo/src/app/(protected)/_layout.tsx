import React from "react";
import { Stack } from "expo-router";

import AuthLayout from "~/components/auth-layout";

export default function ProtectedLayout() {
  return (
    <AuthLayout>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </AuthLayout>
  );
}
