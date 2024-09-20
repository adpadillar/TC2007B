import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";
import { useRouter } from "expo-router";

import { useUser } from "~/utils/auth";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isLoading, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      // Redirect to sign-in page if user is not authenticated
      router.replace("/login");
    }
  }, [isLoading, user, router]);

  if (isLoading) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <ActivityIndicator size="large" className="text-primary" />
      </View>
    );
  }

  if (!user) {
    return null; // Render nothing while redirecting
  }

  return <>{children}</>;
}
