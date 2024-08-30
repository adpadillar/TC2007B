import React from "react";
import { Text, View } from "react-native";
import { Link } from "expo-router";

import NavigationLayout from "../../components/navigation-layout";

export default function Perfil() {
  return (
    <NavigationLayout>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="mb-4 text-3xl font-bold text-foreground">Perfil</Text>
        <Text className="text-center text-lg text-foreground">
          Esta es una pantalla de marcador de posición para la sección de
          Perfil. Aquí se mostrará la información del usuario y las opciones de
          configuración.
        </Text>
        <View className="mt-6">
          <Link href="/signup/individual">
            <Text className="text-primary underline">
              Test: Go to Individual Signup
            </Text>
          </Link>
        </View>
      </View>
    </NavigationLayout>
  );
}
