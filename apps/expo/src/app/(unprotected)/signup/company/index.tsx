import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

export default function SignUpCompany() {
  const router = useRouter();
  const [razonSocial, setRazonSocial] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex h-full justify-center px-10">
        <View>
          <Text className="mb-4 text-2xl font-bold text-foreground">
            Crear cuenta de empresa
          </Text>
          <Text className="mb-6">
            ¿Ya tienes una cuenta?{" "}
            <Link href={{ pathname: "/login" }} className="text-primary">
              <Text className="text-primary underline">Inicia sesión</Text>
            </Link>
          </Text>
        </View>

        <View className="mt-4 flex flex-col gap-y-3">
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Razón social"
            value={razonSocial}
            onChangeText={setRazonSocial}
          />
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
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="mt-20 rounded-md bg-primary p-3"
          onPress={() => {
            router.push("/");
          }}
        >
          <Text className="text-center text-lg font-semibold text-primary-foreground">
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <View className="mt-6 flex items-center">
          <Link
            href={{ pathname: "/signup/individual" }}
            className="text-primary"
          >
            <Text className="text-primary underline">¿Eres un individuo?</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
