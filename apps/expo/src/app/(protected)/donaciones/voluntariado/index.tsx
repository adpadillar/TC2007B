import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "../../../../components/navigation-layout";

export default function Voluntariado() {
  return (
    <NavigationLayout scroll={false}>
      <View className="flex-1 px-8 pb-20 pt-8">
        <Text className="mb-4 text-2xl font-bold text-foreground">
          Donando Tu Tiempo
        </Text>
        <Text className="mb-4 text-lg text-foreground">
          ¡Únete a alguna de las siguientes campañas!
        </Text>

        <View className="mb-4 flex-row items-center rounded-full border border-gray-300 bg-white px-4 py-2">
          <TextInput
            placeholder="Encuentra tu campaña ideal"
            className="flex-1"
          />
          <TouchableOpacity>
            <Ionicons name="add-circle-outline" size={24} color="#000" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <View key={item} className="mb-4 rounded-lg bg-white p-4 shadow">
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={{ width: "100%", height: 150, borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text className="mt-2 text-lg font-bold text-foreground">
                Lorem ipsum dolor
              </Text>
              <Text className="text-sm text-gray-500">
                Subtitle lorem ipsum sunt
              </Text>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="location-outline" size={16} color="#888" />
                <Text className="ml-1 text-sm text-gray-500">
                  Lugar: 15 hrs/wk
                </Text>
              </View>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="time-outline" size={16} color="#888" />
                <Text className="ml-1 text-sm text-gray-500">
                  Horario: 15 hrs/wk
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </NavigationLayout>
  );
}
