import React from "react";
import { Image, ScrollView, Text, View } from "react-native";

import NavigationLayout from "../../../components/navigation-layout";

const ImpactCard = ({
  title,
  description,
  imageSource,
}: {
  title: string;
  description: string;
  imageSource: string;
}) => (
  <View className="mb-4 rounded-lg bg-white p-4 shadow-md">
    <View className="mb-3 h-40 w-full overflow-hidden rounded-lg bg-gray-200">
      <Image
        source={{ uri: imageSource }}
        className="h-full w-full"
        resizeMode="cover"
      />
    </View>
    <Text className="mb-2 text-lg font-semibold text-foreground">{title}</Text>
    <Text className="text-sm text-foreground">{description}</Text>
  </View>
);

export default function Impacto() {
  const impactData = [
    {
      title: "Entrega alimentos Mar-2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      imageSource: "https://via.placeholder.com/600x400",
    },
    {
      title: "Entrega alimentos Mar-2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      imageSource: "https://via.placeholder.com/600x400",
    },
    {
      title: "Entrega alimentos Mar-2024",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor",
      imageSource: "https://via.placeholder.com/600x400",
    },
  ];

  return (
    <NavigationLayout>
      <ScrollView className="mb-20 flex-1 px-4 py-6">
        <Text className="mb-6 text-2xl font-bold text-foreground">
          Tu impacto
        </Text>
        {impactData.map((item, index) => (
          <ImpactCard
            key={index}
            title={item.title}
            description={item.description}
            imageSource={item.imageSource}
          />
        ))}
      </ScrollView>
    </NavigationLayout>
  );
}
