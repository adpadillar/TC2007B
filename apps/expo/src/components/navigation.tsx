import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = () => {
  const navItems = [
    { name: "Inicio", icon: "home-outline" },
    { name: "Donar", icon: "heart-outline" },
    { name: "Impacto", icon: "bar-chart-outline" },
    { name: "Perfil", icon: "person-outline" },
  ] as const;

  return (
    <View className="flex-row items-center justify-around bg-card pb-2 pt-4">
      {navItems.map((item, index) => (
        <TouchableOpacity
          key={index}
          className="items-center"
          onPress={() => {
            // Handle navigation
          }}
        >
          <Ionicons name={item.icon} size={24} color="#000" />
          <Text className="mt-1 text-xs text-foreground">{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomNavigation;
