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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <SafeAreaView className="flex-1 bg-background">
      <ScrollView className="p-4">
        <Text className="mb-4 text-2xl font-bold text-foreground">
          Iniciar sesión
        </Text>
        <Link
          href={{ pathname: "/signup/individual" }}
          className="mb-6 text-primary"
        >
          ¿Aún no tienes cuenta? Crea una
        </Link>

        <View className="space-y-4">
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
        </View>

        <TouchableOpacity
          className="mt-6 rounded-md bg-primary p-3"
          onPress={() => {
            // Handle login logic here
          }}
        >
          <Text className="text-center font-semibold text-primary-foreground">
            Iniciar sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
