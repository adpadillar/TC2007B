import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { useAuth } from "@clerk/clerk-expo";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "../../../../components/navigation-layout";

const ConfigurationItem = ({ icon, text }: { icon: string; text: string }) => (
  <TouchableOpacity className="flex-row items-center gap-x-4 border-b border-gray-200 py-4">
    <Ionicons name={icon as unknown as undefined} size={24} color="#000" />
    <Text className="font-poppins-regular flex-1 text-foreground">{text}</Text>
    <Ionicons name="chevron-forward" size={24} color="#000" />
  </TouchableOpacity>
);

export default function Configuracion() {
  const router = useRouter();
  const { signOut } = useAuth();

  return (
    <NavigationLayout>
      <ScrollView className="flex-1 bg-background px-8">
        <View className="flex-row items-center py-4">
          <TouchableOpacity onPress={() => router.back()} className="mr-4">
            <Ionicons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text className="font-poppins-bold text-xl text-foreground">
            Configuración
          </Text>
        </View>

        <View className="mt-4">
          <Text className="font-poppins-semibold mb-2 text-lg text-foreground">
            Cuenta
          </Text>
          <ConfigurationItem
            icon="person-outline"
            text="Información Personal"
          />
          <ConfigurationItem
            icon="notifications-outline"
            text="Notificaciones"
          />
          <ConfigurationItem
            icon="accessibility-outline"
            text="Accesibilidad"
          />
          <ConfigurationItem icon="log-in-outline" text="Inicio de sesión" />
          <ConfigurationItem icon="shield-outline" text="Seguridad" />
        </View>

        <View className="mt-6">
          <Text className="font-poppins-semibold mb-2 text-lg text-foreground">
            Legal
          </Text>
          <ConfigurationItem
            icon="document-text-outline"
            text="Aviso de privacidad"
          />
          <ConfigurationItem
            icon="document-outline"
            text="Términos del servicio"
          />
        </View>

        <TouchableOpacity
          className="bg-yellowBDA mt-8 rounded-lg py-3"
          onPress={() => signOut()}
        >
          <Text className="font-poppins-semibold text-center text-white">
            Cerrar sesión
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </NavigationLayout>
  );
}
