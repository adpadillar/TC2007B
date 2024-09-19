import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, usePathname } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

const BottomNavigation = () => {
  const currentPath = usePathname();
  const { bottom } = useSafeAreaInsets();

  const navItems = [
    { name: "Inicio", icon: "home-outline", href: "/" },
    { name: "Donar", icon: "heart-outline", href: "/donaciones" },
    { name: "Impacto", icon: "bar-chart-outline", href: "/impacto" },
    { name: "Perfil", icon: "person-outline", href: "/perfil" },
  ] as const;

  return (
    <View
      className="flex-row items-center justify-around bg-card pt-4 shadow"
      style={{ paddingBottom: bottom + 6 }}
    >
      {navItems.map((item, index) => {
        const isSelected =
          item.href !== "/"
            ? currentPath.includes(item.href)
            : currentPath === item.href;
        return (
          <Link key={index} href={item.href} asChild>
            <TouchableOpacity className="items-center">
              <Ionicons
                name={item.icon}
                size={24}
                color={isSelected ? "#E76DAE" : "#000"}
                style={{ fontWeight: isSelected ? "900" : "normal" }}
              />
              <Text
                className={`mt-1 text-xs text-foreground ${
                  isSelected ? "font-extrabold text-primary" : "font-normal"
                }`}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          </Link>
        );
      })}
    </View>
  );
};

export default BottomNavigation;
