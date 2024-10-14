import React, { useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { Picker } from "@react-native-picker/picker";

interface ProjectDetailsScreenProps {
  title: string;
  description: string;
  roleInfo: {
    selectedRole: string;
    setSelectedRole: (role: string) => void;
    roles: string[];
    details: string;
  };
  details: {
    duration: string;
    schedule: string;
    location: string;
    credits: string;
  };
  vacancies: number;
}

const ProjectDetailsScreen = ({
  title,
  description,
  details,
  roleInfo,
  vacancies,
}: ProjectDetailsScreenProps) => {
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
    <ScrollView className="flex-1 bg-gray-100 p-4">
      {/* Title and Image */}
      <View className="items-center">
        <Text className="mb-4 text-xl font-bold">{title}</Text>
        <View className="mb-4 h-48 w-full rounded-lg bg-gray-300">
          {/* <Image
            source={require("./assets/image-placeholder.png")} // Replace with your image source
            className="h-full w-full"
            resizeMode="contain"
          /> */}
        </View>
      </View>

      {/* Description Section */}
      <View>
        <Text className="mb-2 text-lg font-bold">Descripción</Text>
        <Text className="text-base text-gray-700">{description}</Text>
      </View>

      {/* Role Info Section */}
      <View className="mt-6">
        <Text className="mb-2 text-lg font-bold">Role Info</Text>
        <Picker
          selectedValue={roleInfo.selectedRole}
          onValueChange={(itemValue: string) =>
            roleInfo.setSelectedRole(itemValue)
          }
          style={{ height: 50, width: 150 }}
        >
          {roleInfo.roles.map((role, index) => (
            <Picker.Item key={index} label={role} value={role} />
          ))}
        </Picker>
        <Text className="mt-2 text-base text-gray-700">{roleInfo.details}</Text>
      </View>

      {/* Details Section */}
      <View className="mt-6">
        <Text className="mb-2 text-lg font-bold">
          Duración: {details.duration}
        </Text>
        <Text className="text-base">Horario: {details.schedule}</Text>
        <Text className="text-base">Ubicación: {details.location}</Text>
        <Text className="text-base">
          Horas de acreditación: {details.credits}
        </Text>
      </View>

      {/* Apply Button */}
      <View className="mt-6">
        <Pressable
          className="items-center rounded-full bg-orange-500 py-3"
          onPress={handlePress}
        >
          <Text className="text-lg font-bold text-white">APLICA AHORA!</Text>
        </Pressable>
        <Text className="mt-2 text-center text-gray-400">
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
        <View className="flex-1 justify-center bg-gray-800 bg-opacity-50 p-4">
          <View className="rounded-lg bg-white p-6">
            {needsCredit === null && (
              <>
                <Text className="mb-4 text-lg font-bold">
                  ¿Necesitas acreditar horas de servicio social?
                </Text>
                <Pressable
                  className="mb-2 items-center rounded-full bg-green-500 py-2"
                  onPress={() => setNeedsCredit(true)}
                >
                  <Text className="text-white">Sí</Text>
                </Pressable>
                <Pressable
                  className="items-center rounded-full bg-red-500 py-2"
                  onPress={() => setNeedsCredit(false)}
                >
                  <Text className="text-white">No</Text>
                </Pressable>
              </>
            )}

            {needsCredit === true && creditType === null && (
              <>
                <Text className="mb-4 text-lg font-bold">
                  ¿Es para escuela o empresa?
                </Text>
                <Pressable
                  className="mb-2 items-center rounded-full bg-blue-500 py-2"
                  onPress={() => setCreditType("school")}
                >
                  <Text className="text-white">Escuela</Text>
                </Pressable>
                <Pressable
                  className="items-center rounded-full bg-purple-500 py-2"
                  onPress={() => setCreditType("company")}
                >
                  <Text className="text-white">Empresa</Text>
                </Pressable>
              </>
            )}

            {needsCredit === true && creditType === "school" && (
              <>
                <Text className="mb-2 text-lg font-bold">
                  Nombre de la escuela
                </Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Nombre de la escuela"
                  value={formData.schoolName}
                  onChangeText={(text) => handleInputChange("schoolName", text)}
                />
                <Text className="mb-2 text-lg font-bold">Matrícula</Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Matrícula"
                  value={formData.matricula}
                  onChangeText={(text) => handleInputChange("matricula", text)}
                />
                <Text className="mb-2 text-lg font-bold">Carrera</Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Carrera"
                  value={formData.carrera}
                  onChangeText={(text) => handleInputChange("carrera", text)}
                />
                <Text className="mb-2 text-lg font-bold">Semestre</Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Semestre"
                  value={formData.semestre}
                  onChangeText={(text) => handleInputChange("semestre", text)}
                />
              </>
            )}

            {needsCredit === true && creditType === "company" && (
              <>
                <Text className="mb-2 text-lg font-bold">
                  Nombre de la empresa
                </Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Nombre de la empresa"
                  value={formData.companyName}
                  onChangeText={(text) =>
                    handleInputChange("companyName", text)
                  }
                />
                <Text className="mb-2 text-lg font-bold">Posición</Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Posición"
                  value={formData.position}
                  onChangeText={(text) => handleInputChange("position", text)}
                />
                <Text className="mb-2 text-lg font-bold">
                  Correo de trabajo
                </Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Correo de trabajo"
                  value={formData.jobEmail}
                  onChangeText={(text) => handleInputChange("jobEmail", text)}
                />
              </>
            )}

            {needsCredit === false && (
              <>
                <Text className="mb-2 text-lg font-bold">
                  Correo electrónico
                </Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Correo electrónico"
                  value={formData.email}
                  onChangeText={(text) => handleInputChange("email", text)}
                />
                <Text className="mb-2 text-lg font-bold">Nombre completo</Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Nombre completo"
                  value={formData.fullName}
                  onChangeText={(text) => handleInputChange("fullName", text)}
                />
                <Text className="mb-2 text-lg font-bold">
                  Número de teléfono
                </Text>
                <TextInput
                  className="mb-2 border p-2"
                  placeholder="Número de teléfono"
                  value={formData.phoneNumber}
                  onChangeText={(text) =>
                    handleInputChange("phoneNumber", text)
                  }
                />
              </>
            )}

            <Pressable
              className="mt-4 items-center rounded-full bg-gray-500 py-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ProjectDetailsScreen;
