/* eslint-disable @typescript-eslint/no-require-imports */
import type { ImageSourcePropType } from "react-native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";

import NavigationLayout from "~/components/navigation-layout";

const paymentMethods: { name: string; image: ImageSourcePropType }[] = [
  {
    name: "PayPal",
    image:
      require("../../../../../../../assets/paypal.png") as ImageSourcePropType,
  },
  {
    name: "Visa",
    image:
      require("../../../../../../../assets/visa.png") as ImageSourcePropType,
  },
  {
    name: "Amex",
    image:
      require("../../../../../../../assets/amex.png") as ImageSourcePropType,
  },
  {
    name: "Mastercard",
    image:
      require("../../../../../../../assets/mastercard.png") as ImageSourcePropType,
  },
];

export default function PaymentScreen() {
  const handlePayment = (method: string) => {
    console.log(`Selected payment method: ${method}`);
    // Implement payment logic here
  };

  return (
    <NavigationLayout>
      <View className="flex-1 px-4 py-8">
        <Text className="mb-6 text-center text-2xl font-bold">
          Seleccioná el método de pago
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {paymentMethods.map((method) => (
            <TouchableOpacity
              key={method.name}
              className="mb-4 aspect-square w-[48%] items-center justify-center rounded-lg bg-white shadow-md"
              onPress={() => handlePayment(method.name)}
            >
              <Image
                source={method.image}
                className="h-3/4 w-3/4"
                resizeMode="contain"
              />
            </TouchableOpacity>
          ))}
        </View>
        <View className="mt-6 gap-y-4">
          <TouchableOpacity
            className="rounded-lg bg-primary py-3"
            onPress={() => console.log("Terminar pressed")}
          >
            <Text className="text-center font-semibold text-white">
              Terminar
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-lg bg-secondary py-3"
            onPress={() => console.log("Realizar factura pressed")}
          >
            <Text className="text-center font-semibold text-secondary-foreground">
              Realizar factura
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NavigationLayout>
  );
}
