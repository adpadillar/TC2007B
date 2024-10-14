import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import NavigationLayout from "../../../components/navigation-layout";

export default function Perfil() {
  const router = useRouter();
  const currentUser = api.auth.currentUser.useQuery();

  return (
    <NavigationLayout>
      <View className="flex-row items-center justify-between px-6 pt-12">
        <View className="flex-1" />
        <TouchableOpacity
          className="p-2"
          onPress={() => router.push("/perfil/configuracion")}
        >
          <Ionicons name="settings-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>
      <View className="-translate-y-4 items-center">
        <Image
          source={{
            uri:
              currentUser.data?.imageUrl ?? "https://via.placeholder.com/100",
          }}
          className="h-24 w-24 rounded-full"
        />
        <Text className="mt-4 text-2xl font-bold text-foreground">
          {currentUser.data?.firstName} {currentUser.data?.lastName}
        </Text>
        <Text className="text-sm text-muted-foreground">
          Miembro por 3 semanas
        </Text>
      </View>

      <View className="mt-8 px-6">
        <Text className="mb-4 text-lg font-semibold text-foreground">
          Antes de comenzar
        </Text>
        <View className="flex flex-col gap-y-2">
          {[
            { text: "Datos personales", icon: "person-outline", done: true },
            {
              text: "Identificación Oficial",
              icon: "card-outline",
              done: true,
            },
            {
              text: "Carta de compromiso",
              icon: "document-text-outline",
              done: false,
            },
          ].map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center ${item.done ? "opacity-50" : ""}`}
            >
              <View className={`bg-greenBDA/10 mr-4 rounded-full p-2`}>
                <Ionicons
                  // This is a hack to make the type checker happy
                  name={item.icon as unknown as undefined}
                  size={24}
                  color="#22c55e"
                />
              </View>
              <Text
                className={`flex-1 text-foreground ${item.done ? "line-through" : ""}`}
              >
                {item.text}
              </Text>
              {!item.done && (
                <TouchableOpacity>
                  <Text className="text-yellowBDA">Completar</Text>
                </TouchableOpacity>
              )}
            </View>
          ))}
        </View>
      </View>

      <View className="mt-8 px-6">
        <Text className="mb-4 text-lg font-semibold text-foreground">
          Estadísticas
        </Text>
        <View className="rounded-lg bg-card p-4 shadow">
          <Text className="text-2xl font-bold text-foreground">534</Text>
          <Text className="text-sm text-muted-foreground">
            horas de voluntariado
          </Text>
          <View className="mt-2 h-2 w-full rounded-full bg-gray-200">
            <View className="bg-redBDA h-full w-3/4 rounded-full" />
          </View>
        </View>
      </View>

      <View className="mt-8 px-6">
        <Text className="mb-4 text-lg font-semibold text-foreground">
          Tus recompensas
        </Text>
        <View className="flex flex-col gap-y-4">
          {[
            {
              text: "50 horas de servicio social",
              subtext: "Obtenidas la semana pasada",
              icon: "hourglass-outline",
            },
            {
              text: "250 MXN Amazon Gift Card",
              subtext: "Obtenida hace un mes",
              icon: "gift-outline",
            },
          ].map((item, index) => (
            <TouchableOpacity
              key={index}
              className="flex-row items-center rounded-lg bg-card p-4 shadow"
            >
              <View className="bg-yellowBDA mr-4 rounded-full p-2">
                <Ionicons
                  // This is a hack to make the type checker happy
                  name={item.icon as unknown as undefined}
                  size={24}
                  color="#fff"
                />
              </View>
              <View className="flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  {item.text}
                </Text>
                <Text className="text-sm text-muted-foreground">
                  {item.subtext}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </NavigationLayout>
  );
}
