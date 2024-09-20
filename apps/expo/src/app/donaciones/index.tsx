import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "../../components/navigation-layout";

const colors = {
  voluntariado: "#4CAF50", // Green
  especie: "#FFC107", // Amber
  economica: "#2196F3", // Blue
  historial: "#9C27B0", // Purple
};

export default function Donaciones() {
  return (
    <NavigationLayout>
      <View className="px-8 py-8">
        <Text className="mb-4 text-3xl font-bold text-foreground">
          ¿Cómo donar?
        </Text>
        <Text className="mb-6 text-lg text-foreground">
          Tenemos 3 maneras principales como puedes apoyarnos:
        </Text>

        {/* Donation Options */}
        <View className="mb-8">
          <Link href="/donaciones/voluntariado" asChild>
            <TouchableOpacity
              className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow"
              style={{
                borderLeftWidth: 5,
                borderLeftColor: colors.voluntariado,
              }}
            >
              <Ionicons
                name="hourglass-outline"
                size={24}
                color={colors.voluntariado}
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  Donación de tiempo
                </Text>
                <Text className="text-foreground">Hazte voluntario</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.voluntariado}
              />
            </TouchableOpacity>
          </Link>

          <Link href="/donaciones/especie" asChild>
            <TouchableOpacity
              className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow"
              style={{ borderLeftWidth: 5, borderLeftColor: colors.especie }}
            >
              <Ionicons name="gift-outline" size={24} color={colors.especie} />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  Donación en especie
                </Text>
                <Text className="text-foreground">
                  Dona comida u otros artículos
                </Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.especie}
              />
            </TouchableOpacity>
          </Link>

          <Link href="/donaciones/economica" asChild>
            <TouchableOpacity
              className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow"
              style={{ borderLeftWidth: 5, borderLeftColor: colors.economica }}
            >
              <Ionicons
                name="cash-outline"
                size={24}
                color={colors.economica}
              />
              <View className="ml-4 flex-1">
                <Text className="text-lg font-semibold text-foreground">
                  Donación económica
                </Text>
                <Text className="text-foreground">Apadrina a una familia</Text>
              </View>
              <Ionicons
                name="chevron-forward"
                size={24}
                color={colors.economica}
              />
            </TouchableOpacity>
          </Link>
        </View>

        {/* Donation History */}
        <Text className="mb-4 text-2xl font-bold text-foreground">
          Tu historial de donativos
        </Text>
        <View>
          <TouchableOpacity
            className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow"
            style={{ borderLeftWidth: 5, borderLeftColor: colors.historial }}
          >
            <Ionicons
              name="hourglass-outline"
              size={24}
              color={colors.historial}
            />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Donación de tiempo
              </Text>
              <Text className="text-foreground">50 horas de voluntariado</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.historial}
            />
          </TouchableOpacity>

          <TouchableOpacity
            className="mb-4 flex-row items-center rounded-md bg-card p-4 shadow"
            style={{ borderLeftWidth: 5, borderLeftColor: colors.historial }}
          >
            <Ionicons name="cash-outline" size={24} color={colors.historial} />
            <View className="ml-4 flex-1">
              <Text className="text-lg font-semibold text-foreground">
                Donación económica
              </Text>
              <Text className="text-foreground">350 MXN</Text>
            </View>
            <Ionicons
              name="chevron-forward"
              size={24}
              color={colors.historial}
            />
          </TouchableOpacity>
        </View>
      </View>
    </NavigationLayout>
  );
}
