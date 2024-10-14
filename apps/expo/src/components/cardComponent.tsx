import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

import type { RouterOutputs } from "@acme/api";

const CardComponent = ({
  id,
  imageUrl,
  title,
  description,
  roles,
}: RouterOutputs["forms"]["listVolunteerOffers"][number]) => {
  return (
    <Pressable
      onPress={() =>
        router.navigate(`/(protected)/donaciones/voluntariado/proyecto/${id}`)
      } // Replace 'AnotherScreen' with your target screen name
      className="mx-8 my-3 flex-row rounded-lg bg-white px-4 pb-5 pt-4 shadow-sm"
    >
      {/* Image Placeholder */}
      <View className="flex-row gap-2">
        <View className="h-32 w-32 rounded bg-gray-200">
          <Image
            source={{ uri: imageUrl }}
            className="h-full w-full rounded"
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View className="ml-4 flex-col justify-between">
          <View className="items-start">
            <Text className="font-poppins-bold text-lg">{title}</Text>
            <Text className="font-poppins-regular w-64 text-sm text-gray-500">
              {description.substring(0, 89) + "..."}
            </Text>
            <View className="mt-2 flex-row">
              <Text className="font-poppins-semibold text-sm">Rol:</Text>
              <Text className="font-poppins-regular ml-1 text-sm">
                {roles[0]?.description}
              </Text>
              <Text className="font-poppins-semibold ml-4 text-sm">Horas:</Text>
              <Text className="font-poppins-regular ml-1 text-sm">
                {roles[0]?.duration} hrs/wk
              </Text>
            </View>
          </View>

          <View className="">
            <Text className="font-poppins-regular mt-1 text-sm text-gray-400">
              4 vacantes disponibles
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default CardComponent;
