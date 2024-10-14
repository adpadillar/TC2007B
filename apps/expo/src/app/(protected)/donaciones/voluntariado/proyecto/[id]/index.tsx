import React, { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

import NavigationLayout from "~/components/navigation-layout";

// interface ProjectDetailsScreenProps {
//   title: string;
//   description: string;
//   roleInfo: {
//     selectedRole: string;
//     setSelectedRole: (role: string) => void;
//     roles: string[];
//     details: string;
//   };
//   details: {
//     duration: string;
//     schedule: string;
//     location: string;
//     credits: string;
//   };
//   vacancies: number;
// }

const title = "Lorem ipsum dolor";
const description = "Sollicitant homines non sunt.";
const roleInfo = {
  selectedRole: "Staff",
  setSelectedRole: (role: string) => {},
  roles: ["Staff", "Admin", "Developer"],
  details: "Lorem ipsum dolor sit amet consectetur...",
};
const details = {
  duration: "10 hrs/wk",
  schedule: "Flexible",
  location: "Remote",
  credits: "10 hrs",
};
const vacancies = 4;

const ProjectDetailsScreen = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [needsCredit, setNeedsCredit] = useState<boolean | null>(null);
  const [creditType, setCreditType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    schoolName: "",
    matricula: "",
    carrera: "",
    semestre: "",
    companyName: "",
    position: "",
    jobEmail: "",
    email: "",
    fullName: "",
    phoneNumber: "",
  });

  const handlePress = () => {
    setModalVisible(true);
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  return (
    <NavigationLayout>
      <ScrollView className="px-8 pt-14">
        {/* Title and Image */}
        <View className="items-center">
          <Text className="font-poppins-bold mb-6 text-2xl">{title}</Text>
          <View className="mb-6 h-64 w-full rounded-lg bg-gray-300">
            <Image
              source={{ uri: "https://via.placeholder.com/40" }}
              className="h-full w-full"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Description Section */}
        <View>
          <Text className="font-poppins-semibold mb-2 text-lg">
            Descripción
          </Text>
          <Text className="font-poppins-regular text-base text-gray-700">
            {description}
          </Text>
        </View>

        {/* Role Info Section */}
        <View className="mt-6">
          <Text className="font-poppins-semibold mb-2 text-lg">Role Info</Text>
          {/* <Picker
          selectedValue={roleInfo.selectedRole}
          onValueChange={(itemValue: string) =>
            roleInfo.setSelectedRole(itemValue)
          }
          style={{ height: 50, width: 150 }}
        >
          {roleInfo.roles.map((role, index) => (
            <Picker.Item key={index} label={role} value={role} />
          ))}
        </Picker> */}
          <Text className="font-poppins-regular mt-2 text-base text-gray-700">
            {roleInfo.details}
          </Text>
        </View>

        {/* Details Section */}
        <View className="mt-6">
          <View className="flex-row">
            <Text className="font-poppins-bold font-poppins-semibold mb-2 text-base">
              Duración:{" "}
            </Text>
            <Text className="font-poppins-regular text-base">
              {details.duration}
            </Text>
          </View>
          <View className="flex-row">
            <Text className="font-poppins-bold font-poppins-semibold mb-2 text-base">
              Horario:{" "}
            </Text>
            <Text className="font-poppins-regular text-base">
              {details.schedule}
            </Text>
          </View>

          <View className="flex-row">
            <Text className="font-poppins-bold font-poppins-semibold mb-2 text-base">
              Ubicación:{" "}
            </Text>
            <Text className="font-poppins-regular text-base">
              {details.location}
            </Text>
          </View>

          <View className="flex-row">
            <Text className="font-poppins-bold font-poppins-semibold mb-2 text-base">
              Horas de acreditación:{" "}
            </Text>
            <Text className="font-poppins-regular text-base">
              {details.credits}
            </Text>
          </View>
        </View>

        {/* Apply Button */}
        <View className="mt-6">
          <Pressable
            className="items-center rounded-full bg-orange-500 py-3"
            onPress={handlePress}
          >
            <Text className="font-poppins-bold text-lg text-white">
              APLICA AHORA!
            </Text>
          </Pressable>
          <Text className="font-poppins-regular mt-2 text-center text-gray-400">
            {vacancies} vacantes disponibles
          </Text>
        </View>

        {/* Modal */}
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View className="flex-1 justify-center bg-black/40 p-4">
            <View className="rounded-lg bg-white px-6 py-10">
              {needsCredit === null && (
                <>
                  <Text className="font-poppins-semibold mb-6 text-lg">
                    ¿Necesitas acreditar horas de servicio social?
                  </Text>
                  <Pressable
                    className="bg-greenBDA mb-3 items-center rounded-full py-2"
                    onPress={() => setNeedsCredit(true)}
                  >
                    <Text className="text-white">Sí</Text>
                  </Pressable>
                  <Pressable
                    className="bg-redBDA items-center rounded-full py-2"
                    onPress={() => setNeedsCredit(false)}
                  >
                    <Text className="text-white">No</Text>
                  </Pressable>
                </>
              )}

              {needsCredit === true && creditType === null && (
                <>
                  <Text className="font-poppins-bold mb-4 text-lg">
                    ¿Es para escuela o empresa?
                  </Text>
                  <Pressable
                    className="bg-greenBDA mb-2 items-center rounded-full py-2"
                    onPress={() => setCreditType("school")}
                  >
                    <Text className="text-white">Escuela</Text>
                  </Pressable>
                  <Pressable
                    className="bg-yellowBDA items-center rounded-full py-2"
                    onPress={() => setCreditType("company")}
                  >
                    <Text className="text-white">Empresa</Text>
                  </Pressable>
                </>
              )}

              {needsCredit === true && creditType === "school" && (
                <View className="flex-col gap-3">
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Nombre de la escuela
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Nombre de la escuela"
                      value={formData.schoolName}
                      onChangeText={(text) =>
                        handleInputChange("schoolName", text)
                      }
                    />
                  </View>
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Matrícula
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Matrícula"
                      value={formData.matricula}
                      onChangeText={(text) =>
                        handleInputChange("matricula", text)
                      }
                    />
                  </View>
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Carrera
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Carrera"
                      value={formData.carrera}
                      onChangeText={(text) =>
                        handleInputChange("carrera", text)
                      }
                    />
                  </View>
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Semestre
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Semestre"
                      value={formData.semestre}
                      onChangeText={(text) =>
                        handleInputChange("semestre", text)
                      }
                    />
                  </View>
                </View>
              )}

              {needsCredit === true && creditType === "company" && (
                <View className="flex-col gap-2">
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-bold text-lg">
                      Nombre de la empresa
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Nombre de la empresa"
                      value={formData.companyName}
                      onChangeText={(text) =>
                        handleInputChange("companyName", text)
                      }
                    />
                  </View>

                  <View className="flex-col gap-2">
                    <Text className="font-poppins-bold text-lg">Posición</Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Posición"
                      value={formData.position}
                      onChangeText={(text) =>
                        handleInputChange("position", text)
                      }
                    />
                  </View>

                  <View className="flex-col gap-2">
                    <Text className="font-poppins-bold text-lg">
                      Correo de trabajo
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Correo de trabajo"
                      value={formData.jobEmail}
                      onChangeText={(text) =>
                        handleInputChange("jobEmail", text)
                      }
                    />
                  </View>
                </View>
              )}

              {needsCredit === false && (
                <View className="flex-col gap-2">
                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Correo electrónico
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Correo electrónico"
                      value={formData.email}
                      onChangeText={(text) => handleInputChange("email", text)}
                    />
                  </View>

                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Nombre completo
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Nombre completo"
                      value={formData.fullName}
                      onChangeText={(text) =>
                        handleInputChange("fullName", text)
                      }
                    />
                  </View>

                  <View className="flex-col gap-2">
                    <Text className="font-poppins-semibold text-lg">
                      Número de teléfono
                    </Text>
                    <TextInput
                      className="rounded-md border border-gray-400 p-2"
                      placeholder="Número de teléfono"
                      value={formData.phoneNumber}
                      onChangeText={(text) =>
                        handleInputChange("phoneNumber", text)
                      }
                    />
                  </View>
                </View>
              )}

              <Pressable
                className="mt-4 items-center rounded-full bg-gray-300 py-2"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-white">Cerrar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </ScrollView>
    </NavigationLayout>
  );
};

export default ProjectDetailsScreen;
