import { SafeAreaView, ScrollView, View } from "react-native";

import BottomNavigation from "./navigation";

const NavigationLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SafeAreaView className="bg-background">
      <View className="relative h-full w-full bg-background">
        <ScrollView className="flex-1">{children}</ScrollView>
        <View className="absolute bottom-0 left-0 right-0">
          <BottomNavigation />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default NavigationLayout;
