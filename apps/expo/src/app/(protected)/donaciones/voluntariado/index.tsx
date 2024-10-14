import React from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import CardComponent from "~/components/cardComponent";
import { api } from "~/utils/api";
import NavigationLayout from "../../../../components/navigation-layout";

export default function Voluntariado() {
  const data = api.forms.listVolunteerOffers.useQuery();

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
          {data.data?.map((item) => <CardComponent key={item.id} {...item} />)}
        </ScrollView>
      </View>
    </NavigationLayout>
  );
}
