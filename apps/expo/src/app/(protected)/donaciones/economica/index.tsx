import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useRouter } from "expo-router";

import NavigationLayout from "~/components/navigation-layout";
import { api } from "~/utils/api";

function MaybeErrorText({ error }: { error: string | null }) {
  if (error === null) {
    return null;
  }

  return <Text className="pt-2 text-red-500">{error}</Text>;
}

export default function Economica() {
  const submitForm = api.forms.economicalCreate.useMutation({
    onSuccess: (data) => {
      // Navigate to the payment page
      clearErrors();
      clearState();
      router.push(`/donaciones/economica/${data.id}/payment`);
    },
  });

  const [modalOpen, setModalOpen] = useState(false);

  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState<number | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [godfather, setGodfather] = useState(false);

  const [dialogStep, setDialogStep] = useState<1 | 2>(1);

  const predefinedAmounts = [400, 800, 1200, 1600];

  // error states
  const [selectedAmountError, setSelectedAmountError] = useState<null | string>(
    null,
  );
  const [firstNameError, setFirstNameError] = useState<null | string>(null);
  const [lastNameError, setLastNameError] = useState<null | string>(null);
  const [emailError, setEmailError] = useState<null | string>(null);
  const [phoneError, setPhoneError] = useState<null | string>(null);
  const [addressError, setAddressError] = useState<null | string>(null);

  const isValidForm = () => {
    let hasError = false;

    if (selectedAmount === null && customAmount === "") {
      hasError = true;
      setSelectedAmountError("Selecciona al menos una cantidad");
    }

    if (firstName === "") {
      hasError = true;
      setFirstNameError("Ingresa tu nombre");
    }

    if (lastName === "") {
      hasError = true;
      setLastNameError("Ingresa tu apellido");
    }

    if (!email.includes("@")) {
      hasError = true;
      setEmailError("Tu correo es inválido");
    }

    if (email === "") {
      hasError = true;
      setEmailError("Ingresa tu correo electrónico");
    }

    if (phone === "") {
      hasError = true;
      setPhoneError("Ingresa un teléfono");
    }

    if (address === "") {
      hasError = true;
      setAddressError("Ingresa tu dirección de contacto");
    }

    return !hasError;
  };

  const clearErrors = () => {
    setSelectedAmountError(null);
    setFirstNameError(null);
    setLastNameError(null);
    setEmailError(null);
    setPhoneError(null);
    setAddressError(null);
  };

  const clearState = () => {
    setSelectedAmount(null);
    setCustomAmount("");
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setAddress("");
  };

  const handleSubmit = () => {
    // clear current errors
    clearErrors();

    // check if the form is valid
    const isValid = isValidForm();

    // stop if its not valid
    if (!isValid) return;

    submitForm.mutate({
      address: address,
      email: email,
      firstName: firstName,
      lastName: lastName,
      phoneNumber: phone,
      quantity: selectedAmount ? selectedAmount.toString() : customAmount,
      godfather: godfather,
    });
  };

  return (
    <NavigationLayout>
      <Modal
        animationType="fade"
        visible={modalOpen}
        onRequestClose={() => {
          setModalOpen(false);
          setTimeout(() => setDialogStep(1), 500);
        }}
        onDismiss={() => {
          setModalOpen(false);
          setTimeout(() => setDialogStep(1), 500);
        }}
        transparent
      >
        <Pressable
          onPress={(e) => {
            e.stopPropagation();
            setModalOpen(false);
            setTimeout(() => setDialogStep(1), 500);
          }}
          className="flex-1 justify-center bg-black/40 p-4"
        >
          <Pressable className="rounded-lg bg-white px-6 py-10">
            {dialogStep === 1 && (
              <View>
                <Text className="font-poppins-semibold mb-6 text-lg">
                  ¿Quieres apadrinar a una familia?
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    setGodfather(true);
                    setDialogStep(2);
                  }}
                  className="bg-greenBDA mb-3 items-center rounded-full py-2"
                >
                  <Text className="text-white">Sí</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setGodfather(false);
                    setDialogStep(2);
                  }}
                  className="bg-redBDA items-center rounded-full py-2"
                >
                  <Text className="text-white">No</Text>
                </TouchableOpacity>
              </View>
            )}
            {dialogStep === 2 && (
              <View>
                <Text className="font-poppins-semibold mb-6 text-lg">
                  ¡Muchas Gracias!
                </Text>
                <View>
                  <Text>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Facere repudiandae quas odit esse fuga vel sed, ullam maxime
                    itaque dolorum similique tempore eveniet modi soluta.
                    Quaerat eius sint iusto quasi.
                  </Text>
                </View>
              </View>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
                  ? "border-yellowBDA bg-yellowBDA/10"
                  : "border-gray-300"
              }`}
              onPress={() => {
                setSelectedAmount(amount);
                setCustomAmount("");
              }}
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
          <MaybeErrorText error={selectedAmountError} />
        </View>
        <Text className="mb-4 text-lg font-semibold text-foreground">
          Datos personales
        </Text>
        <View className="mb-4">
          <TextInput
            placeholder="Tu nombre"
            className="rounded-md border border-gray-300 p-3"
            value={firstName}
            onChangeText={setFirstName}
          />
          <MaybeErrorText error={firstNameError} />
        </View>
        <View className="mb-4">
          <TextInput
            placeholder="Tu apellido"
            className="rounded-md border border-gray-300 p-3"
            value={lastName}
            onChangeText={setLastName}
          />
          <MaybeErrorText error={lastNameError} />
        </View>
        <View className="mb-4">
          <TextInput
            placeholder="Tu correo electrónico"
            className="rounded-md border border-gray-300 p-3"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <MaybeErrorText error={emailError} />
        </View>
        <View className="mb-4">
          <TextInput
            placeholder="Tu teléfono"
            className="rounded-md border border-gray-300 p-3"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
          />
          <MaybeErrorText error={phoneError} />
        </View>
        <View className="mb-6">
          <TextInput
            placeholder="Tu dirección de contacto"
            className="rounded-md border border-gray-300 p-3"
            value={address}
            onChangeText={setAddress}
          />
          <MaybeErrorText error={addressError} />
        </View>
        <TouchableOpacity
          className="bg-yellowBDA rounded-md p-4"
          onPress={() => {
            clearErrors();

            const valid = isValidForm();
            if (!valid) return;

            setModalOpen(true);
          }}
          disabled={submitForm.isPending}
        >
          <Text className="text-center text-lg font-semibold text-white">
            {submitForm.isPending ? "Enviando..." : "Enviar"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </NavigationLayout>
  );
}
