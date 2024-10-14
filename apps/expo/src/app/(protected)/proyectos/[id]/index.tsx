import type { DimensionValue } from "react-native";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import { api } from "~/utils/api";

export default function ProyectoScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const project = api.projects.getById.useQuery({ id });

  const router = useRouter();

  return (
    <View style={{ backgroundColor: "white", flex: 1 }}>
      <View className="flex flex-col gap-y-4">
        <Image
          source={{ uri: project.data?.imageUrl }}
          style={{ width: "100%", height: 400 }}
          resizeMode="cover"
        />
        <View className="flex flex-col gap-y-4 px-10 pt-8">
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>
            {project.data?.title}
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginTop: 5,
              color: "#666",
            }}
          >
            {project.data?.description ??
              "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Amet consectetur adipiscing elit pellentesque. "}
          </Text>
        </View>

        <View className="px-10 pt-4">
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#666",
              marginBottom: 10,
            }}
          >
            {`Meta: ${project.data?.goal.toLocaleString("es-MX", { style: "currency", currency: "MXN" })}`}
          </Text>
          <View className="mt-3 h-3 w-full rounded-full bg-gray-200">
            <View
              style={{
                width:
                  `${(((project.data?.raised ?? 0) / (project.data?.goal ?? 1)) * 100).toFixed(2)}%` as DimensionValue,
              }}
              className="bg-redBDA h-full rounded-full"
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "600",
              marginTop: 5,
              color: "#666",
            }}
          >
            {`Progreso: ${(((project.data?.raised ?? 0) / (project.data?.goal ?? 1)) * 100).toFixed(2)}%`}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => router.push("/(protected)/donaciones")}
        className="bg-greenBDA absolute bottom-0 left-0 right-0 px-6 py-6 pb-12 shadow"
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: "bold",
            color: "white",
            textAlign: "center",
          }}
        >
          ¡Donar ahora!
        </Text>
      </TouchableOpacity>
    </View>
  );
}
