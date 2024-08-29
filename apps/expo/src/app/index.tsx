import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <View className="h-full w-full bg-background p-4">
        <Text className="text-foreground">Hello World</Text>
        <Text className="text-foreground">Bye World</Text>
      </View>
    </SafeAreaView>
  );
}
