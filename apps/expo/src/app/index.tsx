import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";

export default function Index() {
  return (
    <SafeAreaView className="bg-background">
      {/* Changes page title visible on the header */}
      <View className="h-full w-full bg-background p-4">
        <Link
          href={{ pathname: "/signup/individual" }}
          className="text-foreground"
        >
          Sign Up as Individual
        </Link>
      </View>
    </SafeAreaView>
  );
}
