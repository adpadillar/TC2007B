import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "~/components/navigation-layout";

export default function Especie() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [, setProducer] = useState("");
  const [email, setEmail] = useState("");

  const producerOptions = [
    { key: "1", value: "Sí" },
    { key: "2", value: "No" },
  ];

  return (
    <NavigationLayout>
      <View className="flex-1 px-6 py-8">
        <Text className="mb-6 text-2xl font-bold text-foreground">
          Donaciones en especie
        </Text>
        <Text className="mb-4 text-lg text-foreground">
          Selecciona el tipo de producto que deseas donar:
        </Text>

        <View className="mb-6 flex-row justify-between">
          <TouchableOpacity
            className={`items-center rounded-lg border-2 p-2 ${
              selectedOption === "Alimentos"
                ? "border-primary bg-primary/10"
                : "border-gray-300"
            }`}
            onPress={() => setSelectedOption("Alimentos")}
          >
            <Ionicons name="fast-food-outline" size={60} color="#000" />
            <Text className="mt-2 text-foreground">Alimentos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`items-center rounded-lg border-2 p-2 ${
              selectedOption === "Productos"
                ? "border-primary bg-primary/10"
                : "border-gray-300"
            }`}
            onPress={() => setSelectedOption("Productos")}
          >
            <Ionicons name="cube-outline" size={60} color="#000" />
            <Text className="mt-2 text-foreground">Productos</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className={`items-center rounded-lg border-2 p-2 ${
              selectedOption === "Descuentos"
                ? "border-primary bg-primary/10"
                : "border-gray-300"
            }`}
            onPress={() => setSelectedOption("Descuentos")}
          >
            <Ionicons name="pricetag-outline" size={60} color="#000" />
            <Text className="mt-2 text-foreground">Descuentos</Text>
          </TouchableOpacity>
        </View>

        <Text className="mb-4 text-lg text-foreground">
          Deseas donar como individuo o empresa
        </Text>

        <View className="mb-4">
          <TextInput
            placeholder="Tu empresa/ Tu nombre"
            className="mb-4 rounded-md border border-gray-300 p-3"
            value={company}
            onChangeText={setCompany}
          />
          <TextInput
            placeholder="¿Qué producto quieres donar?"
            className="mb-4 rounded-md border border-gray-300 p-3"
            value={product}
            onChangeText={setProduct}
          />
          {selectedOption === "Alimentos" && (
            <View className="mb-4">
              <Text className="mb-2 text-foreground">¿Eres productor?</Text>
              <SelectList
                setSelected={(val: string) => setProducer(val)}
                data={producerOptions}
                save="value"
                placeholder="Selecciona una opción"
                boxStyles={{ borderColor: "gray", borderRadius: 8 }}
                dropdownStyles={{ borderColor: "gray", borderRadius: 8 }}
              />
            </View>
          )}
          <TextInput
            placeholder="Compártenos tu correo electrónico"
            className="rounded-md border border-gray-300 p-3"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        <TouchableOpacity className="items-center rounded-md bg-primary py-3">
          <Text className="text-lg font-bold text-white">Enviar</Text>
        </TouchableOpacity>
      </View>
    </NavigationLayout>
  );
}
