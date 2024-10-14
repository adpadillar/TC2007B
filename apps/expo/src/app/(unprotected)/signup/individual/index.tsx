import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, useRouter } from "expo-router";

export default function SignUpIndividual() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <View className="flex h-full justify-center px-10">
        <View>
          <Text className="mb-4 text-2xl font-bold text-foreground">
            Crear cuenta individual
          </Text>
          <Text className="mb-6">
            ¿Ya tienes una cuenta?{" "}
            <Link href={{ pathname: "/login" }} className="text-primary">
              <Text className="text-yellowBDA underline">Inicia sesión</Text>
            </Link>
          </Text>
        </View>

        <View className="mt-4 flex flex-col gap-y-3">
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Nombre completo"
            value={fullName}
            onChangeText={setFullName}
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
            autoCorrect={false}
          />
          <TextInput
            className="rounded-md border border-input px-2 py-3 text-foreground"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
            autoCorrect={false}
          />
        </View>

        <TouchableOpacity
          className="bg-yellowBDA mt-20 rounded-md p-3"
          onPress={() => {
            // Handle sign up logic here
            router.push("/");
          }}
        >
          <Text className="text-yellowBDA-foreground text-center text-lg font-semibold">
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <View className="mt-6 flex items-center">
          <Link
            href={{ pathname: "/signup/company" }}
            className="text-yellowBDA"
          >
            <Text className="text-yellowBDA underline">¿Eres una empresa?</Text>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
}
