import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
              className="text-primary"
            >
              <Text className="text-primary underline">Crea una</Text>
            </Link>
          </Text>
        </View>

        <View className="mt-4 flex flex-col gap-y-3">
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="mt-20 rounded-md bg-primary p-3"
          onPress={() => {
            // Handle login logic here
          }}
        >
          <Text className="text-center text-lg font-semibold text-primary-foreground">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
