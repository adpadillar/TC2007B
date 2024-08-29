import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "../components/navigation-layout";

export default function Index() {
  return (
    <NavigationLayout>
      <View className="px-8 py-8">
        {/* Recent Donations Section */}
        <View className="mb-8">
          <Text className="mb-4 text-2xl font-bold text-foreground">
            Tus donaciones recientes
          </Text>

          <TouchableOpacity className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow">
            <Ionicons name="time-outline" size={24} color="#000" />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Donación de tiempo
              </Text>
              <Text className="text-foreground">50 horas de voluntariado</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow">
            <Ionicons name="add-circle-outline" size={24} color="#000" />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Hacer una nueva donación
              </Text>
              <Text className="text-foreground">Elige tipo de donación</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        {/* Your Impact Section */}
        <View>
          <Text className="mb-4 text-2xl font-bold text-foreground">
            Tu impacto
          </Text>

          <View className="rounded-md bg-card p-4 shadow">
            <Image
              source={{
                uri: "https://plus.unsplash.com/premium_photo-1683141170766-017bf7a2ecb4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
              }}
              style={{ width: "100%", height: 200 }}
              resizeMode="cover"
            />
            <View className="mt-2">
              <Text className="mb-1 text-lg font-semibold text-foreground">
                Entrega de alimentos Mar-2024
              </Text>
              <Text className="text-foreground">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.
              </Text>
            </View>
          </View>
        </View>
      </View>
    </NavigationLayout>
  );
}
