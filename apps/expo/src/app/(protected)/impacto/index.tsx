import React from "react";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { useRouter } from "expo-router";

import type { RouterOutputs } from "@acme/api";

import { api } from "~/utils/api";
import NavigationLayout from "../../../components/navigation-layout";

const ImpactCard = ({
  title,
  imageUrl,
  description,
  id,
}: RouterOutputs["projects"]["list"][number]) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      onPress={() => router.push(`/(protected)/proyectos/${id}`)}
      className="mb-4 rounded-lg bg-white p-4 shadow-sm"
    >
      <View className="mb-3 h-72 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          source={{ uri: imageUrl }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <Text className="font-poppins-semibold mb-2 text-lg text-foreground">
        {title}
      </Text>
      <Text className="font-poppins-regular text-sm text-foreground">
        {description ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque."}
      </Text>
    </TouchableOpacity>
  );
};

const ImpactCardLoading = () => (
  <View testID="impact-card-loading" className="mb-4 rounded-lg bg-white p-4">
    <View className="mb-3 h-40 w-full animate-pulse overflow-hidden rounded-lg bg-gray-200">
      <View className="h-full w-full bg-gray-300"></View>
    </View>
    <View className="mb-2 h-10 w-full animate-pulse bg-gray-200"></View>
    <View className="h-10 w-full animate-pulse bg-gray-200 text-sm"></View>
  </View>
);

export default function Impacto() {
  const { data: projects, isLoading: projectsLoading } =
    api.projects.list.useQuery();

  return (
    <NavigationLayout>
      <ScrollView className="px-8 pb-20 pt-14">
        <Text className="font-poppins-bold mb-10 text-3xl text-foreground">
          Tu impacto
        </Text>
        {projectsLoading &&
          [1, 2, 3, 4].map((n) => <ImpactCardLoading key={n} />)}
        {projects?.map((item, index) => <ImpactCard key={index} {...item} />)}
      </ScrollView>
    </NavigationLayout>
  );
}
