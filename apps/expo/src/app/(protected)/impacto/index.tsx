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
      className="mb-4 rounded-lg bg-white p-4 shadow-md"
    >
      <View className="mb-3 h-72 w-full overflow-hidden rounded-lg bg-gray-200">
        <Image
          source={{ uri: imageUrl }}
          className="h-full w-full"
          resizeMode="cover"
        />
      </View>
      <Text className="mb-2 text-lg font-semibold text-foreground">
        {title}
      </Text>
      <Text className="text-sm text-foreground">
        {description ??
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque."}
      </Text>
    </TouchableOpacity>
  );
};

const ImpactCardLoading = () => (
  <View className="mb-4 rounded-lg bg-white p-4 shadow-md">
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
      <ScrollView className="mb-20 flex-1 px-4 py-6">
        <Text className="mb-12 text-2xl font-bold text-foreground">
          Tu impacto
        </Text>
        {projectsLoading &&
          [1, 2, 3, 4].map((n) => <ImpactCardLoading key={n} />)}
        {projects?.map((item, index) => <ImpactCard key={index} {...item} />)}
      </ScrollView>
    </NavigationLayout>
  );
}
