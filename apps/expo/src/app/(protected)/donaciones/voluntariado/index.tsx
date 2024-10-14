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
      <View>
        <View className="px-8 pb-4 pt-14">
          <Text className="font-poppins-bold text-darkGreyBDA mb-4 text-2xl">
            Donando Tu Tiempo
          </Text>
          <Text className="text-lightGreyBDA font-poppins-regular mb-4 text-base">
            ¡Únete a alguna de las siguientes campañas!
          </Text>

          <View className="mb-4 flex-row items-center rounded-full border border-gray-300 bg-white px-4 py-2">
            <TextInput
              placeholder="Encuentra tu campaña ideal"
              className="font-poppins-regular flex-1 text-base text-gray-400"
            />
            <TouchableOpacity>
              <Ionicons name="search" size={24} color="#9ca3af" />
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {[1, 2, 3, 4].map((item) => (
            <View
              key={item}
              className="mx-8 my-3 rounded-lg bg-white p-4 shadow-sm"
            >
              <Image
                source={{ uri: "https://via.placeholder.com/100" }}
                style={{ width: "100%", height: 150, borderRadius: 8 }}
                resizeMode="cover"
              />
              <Text className="font-poppins-bold text-darkGreyBDA mt-2 text-lg">
                Lorem ipsum dolor
              </Text>
              <Text className="font-poppins-regular text-sm text-gray-500">
                Subtitle lorem ipsum sunt
              </Text>
              <View className="mt-2 flex-row items-center">
                <Ionicons name="location-outline" size={16} color="#888" />
                <Text className="font-poppins-regular ml-1 text-sm text-gray-500">
                  Lugar: 15 hrs/wk
                </Text>
              </View>
              <View className="mt-1 flex-row items-center">
                <Ionicons name="time-outline" size={16} color="#888" />
                <Text className="font-poppins-regular ml-1 text-sm text-gray-500">
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
