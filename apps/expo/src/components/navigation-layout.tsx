import { SafeAreaView, ScrollView, View } from "react-native";

import BottomNavigation from "./navigation";

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <View className="relative h-full w-full bg-background">
      <SafeAreaView className="flex-1">
        <ScrollView>{children}</ScrollView>
      </SafeAreaView>
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation />
      </View>
    </View>
  );
};

export default NavigationLayout;
