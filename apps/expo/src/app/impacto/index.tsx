import React from "react";
import { Text, View } from "react-native";

import NavigationLayout from "../../components/navigation-layout";

export default function Impacto() {
  return (
    <NavigationLayout>
      <View className="flex-1 items-center justify-center px-8">
        <Text className="mb-4 text-3xl font-bold text-foreground">Impacto</Text>
        <Text className="text-center text-lg text-foreground">
          Esta es una pantalla de marcador de posición para la sección de
          Impacto. Aquí se mostrará información sobre el impacto de las
          donaciones y actividades.
        </Text>
      </View>
    </NavigationLayout>
  );
}
