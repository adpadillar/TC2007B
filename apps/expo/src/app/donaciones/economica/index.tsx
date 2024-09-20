import React, { useState } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import NavigationLayout from "~/components/navigation-layout";

export default function Economica() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const predefinedAmounts = [400, 800, 1200, 1600];

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log("Form submitted");
    // Navigate to the payment page
    router.push(`/donaciones/economica/1/payment`);
  };

  return (
    <NavigationLayout>
      <ScrollView className="flex-1 px-8 py-8">
        <Text className="mb-6 text-2xl font-bold text-foreground">
          Donacion economica
        </Text>
        <Text className="mb-4 text-lg text-foreground">
          Selecciona el monto que deseas donar
        </Text>
        <View className="mb-4 flex-row flex-wrap justify-between">
          {predefinedAmounts.map((amount) => (
            <TouchableOpacity
              key={amount}
              className={`mb-2 w-[48%] rounded-md border p-3 ${
                selectedAmount === amount
                  ? "border-primary bg-primary/10"
                  : "border-gray-300"
              }`}
              onPress={() => setSelectedAmount(amount)}
            >
              <Text className="text-center text-lg font-semibold">
                ${amount}
              </Text>
            </TouchableOpacity>
          ))}
          <View className="w-full">
            <TextInput
              placeholder="Ingresa otra cantidad"
              className="mt-2 rounded-md border border-gray-300 p-3"
              keyboardType="numeric"
              value={customAmount}
              onChangeText={(text) => {
                setCustomAmount(text);
                setSelectedAmount(null);
              }}
            />
          </View>
        </View>
        <Text className="mb-4 text-lg font-semibold text-foreground">
          Datos personales
        </Text>
        <TextInput
          placeholder="Tu nombre"
          className="mb-4 rounded-md border border-gray-300 p-3"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          placeholder="Tu apellido"
          className="mb-4 rounded-md border border-gray-300 p-3"
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          placeholder="Tu correo electrónico"
          className="mb-4 rounded-md border border-gray-300 p-3"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          placeholder="Tu teléfono"
          className="mb-4 rounded-md border border-gray-300 p-3"
          keyboardType="phone-pad"
          value={phone}
          onChangeText={setPhone}
        />
        <TextInput
          placeholder="Tu dirección de contacto"
          className="mb-6 rounded-md border border-gray-300 p-3"
          value={address}
          onChangeText={setAddress}
        />
        <TouchableOpacity
          className="rounded-md bg-primary p-4"
          onPress={handleSubmit}
        >
          <Text className="text-center text-lg font-semibold text-white">
            Enviar
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </NavigationLayout>
  );
}
