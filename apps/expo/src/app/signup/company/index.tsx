import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function SignUpCompany() {
  const [razonSocial, setRazonSocial] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="relative h-full p-4">
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

        <View className="flex flex-col gap-y-3">
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
          className="mt-8 rounded-md bg-primary p-3"
          onPress={() => {
            // Handle sign up logic here
          }}
        >
          <Text className="text-center font-semibold text-primary-foreground">
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <View className="mt-6 flex items-center">
          <Link
            href={{ pathname: "/signup/individual" }}
            className="text-center text-primary"
          >
            <Text className="text-primary underline">¿Eres un individuo?</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
