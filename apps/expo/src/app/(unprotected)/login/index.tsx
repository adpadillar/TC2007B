import React, { useCallback } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";
import { useOAuth } from "@clerk/clerk-expo";

export default function Login() {
  const router = useRouter();
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });

  const handleSignInWithGoogle = useCallback(async () => {
    try {
      const { createdSessionId, setActive } = await startOAuthFlow();
      if (createdSessionId) {
        await setActive?.({ session: createdSessionId });
        router.push("/(protected)/");
      } else {
        // Modify this code to use signIn or signUp to set this missing requirements you set in your dashboard.
        throw new Error(
          "There are unmet requirements, modifiy this else to handle them",
        );
      }
    } catch (err) {
      console.log(JSON.stringify(err, null, 2));
      console.log("error signing in", err);
    }
  }, [startOAuthFlow, router]);

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex h-full justify-center px-10">
        <View>
          <Text className="mb-4 text-2xl font-bold text-foreground">
            Iniciar sesión
          </Text>
          <Text className="mb-6">
            ¿Aún no tienes cuenta?{" "}
            <Link
              href={{ pathname: "/signup/individual" }}
              className="text-yellowBDA"
            >
              <Text className="text-yellowBDA underline">Crea una</Text>
            </Link>
          </Text>
        </View>

        <TouchableOpacity
          className="bg-yellowBDA mt-20 rounded-md p-3"
          onPress={handleSignInWithGoogle}
        >
          <Text className="text-yellowBDA-foreground text-center text-lg font-semibold">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
