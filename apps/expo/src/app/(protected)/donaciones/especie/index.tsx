import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

import NavigationLayout from "~/components/navigation-layout";
import { api } from "~/utils/api";

function MaybeErrorText({ error }: { error: string | null }) {
  if (error === null) {
    return null;
  }

  return <Text className="pt-2 text-red-500">{error}</Text>;
}

export default function Especie() {
  const router = useRouter();
  const submitForm = api.forms.physicalCreate.useMutation({
    onSuccess: () => {
      clearState();
      clearErrors();
      router.push("/(protected)/donaciones");
    },
  });

  const [selectedOption, setSelectedOption] = useState<
    "food" | "products" | "discounts" | null
  >(null);
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState("");
  const [producer, setProducer] = useState("");
  const [email, setEmail] = useState("");

  const [selectedOptionError, setSelectedOptionError] = useState<string | null>(
    null,
  );
  const [companyError, setCompanyError] = useState<string | null>(null);
  const [productError, setProductError] = useState<string | null>(null);
  const [producerError, setProducerError] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<string | null>(null);

  const producerOptions = [
    { key: "1", value: "Sí" },
    { key: "2", value: "No" },
  ];

  const clearState = () => {
    setSelectedOption(null);
    setCompany("");
    setProducer("");
    setProduct("");
    setEmail("");
  };

  const clearErrors = () => {
    setSelectedOptionError(null);
    setCompanyError(null);
    setProductError(null);
    setProducerError(null);
    setEmailError(null);
  };

  const isValidForm = () => {
    let hasError = false;

    if (selectedOption === null) {
      hasError = true;
      setSelectedOptionError("Selecciona al menos una opción");
    }

    if (company === "") {
      hasError = true;
      setCompanyError("Es necesario llenar este campo");
    }

    if (product === "") {
      hasError = true;
      setProductError("Es necesario llenar este campo");
    }

    if (selectedOption === "food" && producer === "") {
      setProducerError("Selecciona una opcion");
      hasError = true;
    }

    if (!email.includes("@")) {
      setEmailError("Este email no es válido");
      hasError = true;
    }

    if (email === "") {
      setEmailError("Ingresa un email válido");
      hasError = true;
    }

    return !hasError;
  };

  const handleSubmit = () => {
    // clear current errors
    clearErrors();

    // check of the form is valid
    const isValid = isValidForm();

    if (!isValid) return;
    if (!selectedOption) return;

    submitForm.mutate({
      concept: product,
      email: email,
      name: company,
      type: selectedOption,
      isProducer: selectedOption === "food" ? producer === "Sí" : undefined,
    });
  };

  return (
    <NavigationLayout>
      <View className="flex-1 px-6 py-8">
        <Text className="mb-6 text-2xl font-bold text-foreground">
          Donaciones en especie
        </Text>
        <Text className="mb-4 text-lg text-foreground">
          Selecciona el tipo de producto que deseas donar:
        </Text>

        <View className="mb-6">
          <View className="flex-row justify-between">
            <TouchableOpacity
              className={`items-center rounded-lg border-2 p-2 ${
                selectedOption === "food"
                  ? "border-greenBDA bg-greenBDA/10"
                  : "border-gray-300"
              }`}
              onPress={() => setSelectedOption("food")}
            >
              <Ionicons name="fast-food-outline" size={60} color="#000" />
              <Text className="mt-2 text-foreground">Alimentos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`items-center rounded-lg border-2 p-2 ${
                selectedOption === "products"
                  ? "border-greenBDA bg-greenBDA/10"
                  : "border-gray-300"
              }`}
              onPress={() => setSelectedOption("products")}
            >
              <Ionicons name="cube-outline" size={60} color="#000" />
              <Text className="mt-2 text-foreground">Productos</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`items-center rounded-lg border-2 p-2 ${
                selectedOption === "discounts"
                  ? "border-greenBDA bg-greenBDA/10"
                  : "border-gray-300"
              }`}
              onPress={() => setSelectedOption("discounts")}
            >
              <Ionicons name="pricetag-outline" size={60} color="#000" />
              <Text className="mt-2 text-foreground">Descuentos</Text>
            </TouchableOpacity>
          </View>
          <MaybeErrorText error={selectedOptionError} />
        </View>

        <Text className="mb-4 text-lg text-foreground">
          Deseas donar como individuo o empresa
        </Text>

        <View className="mb-4">
          <View className="mb-4">
            <TextInput
              placeholder="Tu empresa/ Tu nombre"
              className="rounded-md border border-gray-300 p-3"
              value={company}
              onChangeText={setCompany}
            />
            <MaybeErrorText error={companyError} />
          </View>
          <View className="mb-4">
            <TextInput
              placeholder="¿Qué producto quieres donar?"
              className="rounded-md border border-gray-300 p-3"
              value={product}
              onChangeText={setProduct}
            />
            <MaybeErrorText error={productError} />
          </View>
          {selectedOption === "food" && (
            <View className="mb-4">
              <Text className="mb-2 text-foreground">¿Eres productor?</Text>
              <SelectList
                setSelected={(val: string) => setProducer(val)}
                data={producerOptions}
                searchPlaceholder="Busca una opcion"
                save="value"
                placeholder="Selecciona una opción"
                boxStyles={{ borderColor: "gray", borderRadius: 8 }}
                dropdownStyles={{ borderColor: "gray", borderRadius: 8 }}
              />
              <MaybeErrorText error={producerError} />
            </View>
          )}
          <View className="mb-4">
            <TextInput
              placeholder="Compártenos tu correo electrónico"
              className="rounded-md border border-gray-300 p-3"
              value={email}
              onChangeText={setEmail}
            />
            <MaybeErrorText error={emailError} />
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSubmit}
          disabled={submitForm.isPending}
          className="bg-greenBDA items-center rounded-md py-3"
        >
          <Text className="text-lg font-bold text-white">
            {submitForm.isPending ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </View>
    </NavigationLayout>
  );
}
