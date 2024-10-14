import React from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import { api } from "~/utils/api";
import NavigationLayout from "../../components/navigation-layout";

export default function Index() {
  const router = useRouter();
  const { data: projects, isLoading: projectsLoading } =
    api.projects.get.useQuery();

  return (
    <NavigationLayout safeArea={false}>
      <View className="flex-1">
        {/* Header Section with rounded bottom */}
        <View className="w-[120vw] -translate-x-[10vw] rounded-b-[90px] bg-primary px-[20vw] pb-16 pt-24">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Image
                source={{ uri: "https://via.placeholder.com/40" }}
                style={{ width: 40, height: 40, borderRadius: 20 }}
              />
              <View className="ml-2">
                <Text className="text-lg font-bold text-white">
                  ¡Bienvenido de nuevo!
                </Text>
                <Text className="text-lg text-white">Axel Padillaaaa</Text>
              </View>
            </View>
            <TouchableOpacity
              onPress={() => router.push("/perfil/configuracion")}
            >
              <Ionicons name="settings-outline" size={24} color="#fff" />
            </TouchableOpacity>
          </View>
        </View>

        <View className="-translate-y-[55px]">
          {/* Search Bar */}
          <View className="mb-4 mt-8 px-8">
            <TextInput
              placeholder="Busca noticias o información..."
              className="w-full rounded-full border border-gray-200 bg-white p-3 shadow"
            />
          </View>

          {/* Info Card */}
          <View className="mx-8 mb-4 flex-row rounded-md bg-card p-4 shadow">
            <Image
              source={{ uri: "https://via.placeholder.com/100" }}
              style={{ width: 150, height: 100, borderRadius: 8 }}
              resizeMode="cover"
            />
            <View className="ml-4 flex-1">
              <Text className="font-bold text-foreground">
                Conoce sobre el BAMX
              </Text>
              <Text className="text-foreground">
                Lorem ipsum dolor sit amet consectetur...
              </Text>
            </View>
          </View>

          {/* Community Section */}
          <View className="mb-4 mt-6">
            <Text className="mb-4 ml-8 text-3xl font-bold text-foreground">
              Comunidad
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="py-2 pl-8"
            >
              <View className="flex-row">
                {projectsLoading &&
                  [1, 2, 3, 4].map((n) => (
                    <View key={n} className="mr-4 w-72">
                      <View className="rounded-xl bg-card p-4 shadow">
                        <View className="h-180 w-full animate-pulse rounded-3xl bg-gray-200"></View>
                        <View className="mt-4 h-10 w-full animate-pulse bg-gray-200"></View>
                        <View className="mt-2 h-10 w-full animate-pulse bg-gray-200"></View>
                        <View className="mt-3 h-3 w-full rounded-full bg-gray-200">
                          <View className="h-full w-3/4 animate-pulse rounded-full bg-gray-300"></View>
                        </View>
                      </View>
                    </View>
                  ))}
                {projects?.map((project) => {
                  return (
                    <View key={project.id} className="mr-4 w-72">
                      <View className="rounded-xl bg-card p-4 shadow">
                        <Image
                          source={{ uri: project.imageUrl }}
                          style={{
                            width: "100%",
                            height: 180,
                            borderRadius: 12,
                          }}
                          resizeMode="cover"
                        />
                        <Text className="mt-4 text-xl font-bold text-foreground">
                          {project.title}
                        </Text>
                        <Text className="text-base text-foreground">
                          {project.raised.toLocaleString("es-MX", {
                            style: "currency",
                            currency: "MXN",
                          })}{" "}
                          raised
                        </Text>
                        <View className="mt-3 h-3 w-full rounded-full bg-gray-200">
                          <View className="h-full w-3/4 rounded-full bg-primary" />
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
            </ScrollView>
          </View>
        </View>

        {/* Donate Button */}
        <TouchableOpacity className="absolute bottom-6 right-4 rounded-full bg-primary px-6 py-3 shadow">
          <Text className="text-center font-bold text-white">Dona ahora!</Text>
        </TouchableOpacity>
      </View>
    </NavigationLayout>
  );
}
