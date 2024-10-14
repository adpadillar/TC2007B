import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { router } from "expo-router";

interface CardComponentProps {
  id: string;
}

const CardComponent = ({ id }: CardComponentProps) => {
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
            source={{ uri: "https://via.placeholder.com/40" }}
            className="h-full w-full rounded"
            resizeMode="contain"
          />
        </View>

        {/* Text Content */}
        <View className="ml-4 flex-col justify-between">
          <View className="items-start">
            <Text className="font-poppins-bold text-lg">Lorem ipsum dolor</Text>
            <Text className="font-poppins-regular text-sm text-gray-500">
              Sollicitant homines non sunt.
            </Text>
            <View className="mt-2 flex-row">
              <Text className="font-poppins-semibold text-sm">Rol:</Text>
              <Text className="font-poppins-regular ml-1 text-sm">Staff</Text>
              <Text className="font-poppins-semibold ml-4 text-sm">Horas:</Text>
              <Text className="font-poppins-regular ml-1 text-sm">
                10 hrs/wk
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
