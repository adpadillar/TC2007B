import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "../../../components/navigation-layout";

const colors = {
  voluntariado: "#00953b", // Green
  especie: "#f19800", // Amber
  economica: "#ce0e2d", // red
  historial: "#5c5c60", // Purple
};

export default function Donaciones() {
  return (
    <NavigationLayout>
      <View className="px-8 pt-14">
        <Text className="font-poppins-bold text-darkGrayBDA mb-3 text-3xl">
          ¿Cómo donar?
        </Text>
        <Text className="text-darkGrayBDA font-poppins-regular mb-7 text-base">
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
                <Text className="font-poppins-semibold text-darkGrayBDA text-darkGrayBDA text-lg">
                  Donación de tiempo
                </Text>
                <Text className="font-poppins-regular text-darkGrayBDA text-base">
                  Hazte voluntario
                </Text>
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
                <Text className="font-poppins-semibold text-darkGrayBDA text-lg">
                  Donación en especie
                </Text>
                <Text className="text-darkGrayBDA text-base">
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
                <Text className="font-poppins-semibold text-darkGrayBDA text-lg">
                  Donación económica
                </Text>
                <Text className="text-darkGrayBDA text-base">
                  Apadrina a una familia
                </Text>
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
        <Text className="font-poppins-bold text-darkGrayBDA mb-6 text-2xl">
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
              <Text className="font-poppins-semibold text-darkGrayBDA text-lg">
                Donación de tiempo
              </Text>
              <Text className="text-darkGrayBDA font-poppins-regular">
                50 horas de voluntariado
              </Text>
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
              <Text className="font-poppins-semibold text-darkGrayBDA text-lg">
                Donación económica
              </Text>
              <Text className="text-darkGrayBDA font-poppins-regular">
                350 MXN
              </Text>
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
