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

export default function SignUpIndividual() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="p-4">
        <Text className="mb-4 text-2xl font-bold text-foreground">
          Crear cuenta
        </Text>
        <Link href={{ pathname: "/login" }} className="mb-6 text-primary">
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>

        <View className="space-y-4">
          <TextInput
            className="rounded-md bg-input p-2 text-foreground"
            placeholder="Nombre completo"
            value={fullName}
            onChangeText={setFullName}
          />
          <TextInput
            className="rounded-md bg-input p-2 text-foreground"
            placeholder="Correo electrónico"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />
          <TextInput
            className="rounded-md bg-input p-2 text-foreground"
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
          <TextInput
            className="rounded-md bg-input p-2 text-foreground"
            placeholder="Confirmar contraseña"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry
          />
        </View>

        <TouchableOpacity
          className="mt-6 rounded-md bg-primary p-3"
          onPress={() => {
            // Handle sign up logic here
          }}
        >
          <Text className="text-center font-semibold text-primary-foreground">
            Crear cuenta
          </Text>
        </TouchableOpacity>

        <Link
          href={{ pathname: "/signup/company" }}
          className="mt-6 text-center text-primary"
        >
          ¿Eres una empresa?
        </Link>
      </ScrollView>
    </SafeAreaView>
  );
}
