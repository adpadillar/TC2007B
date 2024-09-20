import React from "react";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // For testing purposes, we'll render the children directly
  return <>{children}</>;

  // const { isLoading, user } = useUser();
  // const router = useRouter();

  // useEffect(() => {
  //   if (!isLoading && !user) {
  //     // Redirect to sign-in page if user is not authenticated
  //     router.replace("/login");
  //   }
  // }, [isLoading, user, router]);

  // if (isLoading) {
  //   return (
  //     <View className="flex-1 items-center justify-center bg-background">
  //       <ActivityIndicator size="large" className="text-primary" />
  //     </View>
  //   );
  // }

  // if (!user) {
  //   return null; // Render nothing while redirecting
  // }

  // return <>{children}</>;
}
