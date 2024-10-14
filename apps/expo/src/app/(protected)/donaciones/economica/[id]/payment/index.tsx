/* eslint-disable @typescript-eslint/no-require-imports */
import type { ImageSourcePropType } from "react-native";
import React, { useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";

import NavigationLayout from "~/components/navigation-layout";
import { api } from "~/utils/api";

const paymentMethods: {
  name: string;
  image: ImageSourcePropType;
  id: PaymentMethod;
}[] = [
  {
    name: "PayPal",
    id: "paypal",
    image:
      require("../../../../../../../assets/paypal.png") as ImageSourcePropType,
  },
  {
    name: "Visa",
    id: "visa",
    image:
      require("../../../../../../../assets/visa.png") as ImageSourcePropType,
  },
  {
    name: "Amex",
    id: "amex",
    image:
      require("../../../../../../../assets/amex.png") as ImageSourcePropType,
  },
  {
    name: "Mastercard",
    id: "mastercard",
    image:
      require("../../../../../../../assets/mastercard.png") as ImageSourcePropType,
  },
];

type PaymentMethod = "paypal" | "visa" | "amex" | "mastercard";

export default function PaymentScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const payForm = api.forms.economicalPay.useMutation({
    onSuccess: () => {
      router.push("/(protected)/donaciones");
    },
  });

  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod | null>(
    null,
  );

  const handlePayment = () => {
    if (paymentMethod === null) return;
    payForm.mutate({
      formId: id,
      paymentMethod,
    });
  };

  return (
    <NavigationLayout>
      <View className="flex-1 px-4 py-8">
        <Text className="mb-6 text-center text-2xl font-bold">
          Seleccioná el método de pago
        </Text>
        <View className="flex-row flex-wrap justify-between">
          {paymentMethods.map((method) => {
            const isSelected = paymentMethod === method.id;

            return (
              <TouchableOpacity
                key={method.name}
                className={`mb-4 aspect-square w-[48%] items-center justify-center rounded-lg bg-white shadow-md ${isSelected ? "border-2 border-primary" : ""}`}
                onPress={() => setPaymentMethod(method.id)}
              >
                <Image
                  source={method.image}
                  className="h-3/4 w-3/4"
                  resizeMode="contain"
                />
              </TouchableOpacity>
            );
          })}
        </View>
        <View className="mt-6 gap-y-4">
          <TouchableOpacity
            className="rounded-lg bg-primary py-3"
            onPress={handlePayment}
          >
            <Text className="text-center font-semibold text-white">
              {payForm.isPending ? "Cargando..." : "Pagar ahora"}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </NavigationLayout>
  );
}
