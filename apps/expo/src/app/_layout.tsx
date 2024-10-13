import "@bacons/text-decoder/install";

import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useColorScheme } from "nativewind";

import { TRPCProvider } from "~/utils/api";

import "../styles.css";

import { ClerkProvider } from "@clerk/clerk-expo";

// This is the main layout of the app
// It wraps your pages with the providers they need
export default function RootLayout() {
  const { colorScheme } = useColorScheme();
  return (
    <ClerkProvider publishableKey="pk_test_dHJ1ZS1zdGFyZmlzaC00Ny5jbGVyay5hY2NvdW50cy5kZXYk">
      <TRPCProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorScheme == "dark" ? "#09090B" : "#FFFFFF",
            },
          }}
        />
        <StatusBar />
      </TRPCProvider>
    </ClerkProvider>
  );
}
