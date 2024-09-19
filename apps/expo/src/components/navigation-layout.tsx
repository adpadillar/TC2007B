import { Platform, SafeAreaView, ScrollView, View } from "react-native";

import BottomNavigation from "./navigation";

const NavigationLayout = ({
  children,
  safeArea = true,
}: {
  children: React.ReactNode;
  safeArea?: boolean;
}) => {
  const MyView = safeArea ? SafeAreaView : View;

  return (
    <View className="relative h-full w-full bg-background">
      <MyView
        className="flex-1"
        style={
          safeArea ? { paddingTop: Platform.OS === "android" ? 50 : 0 } : {}
        }
      >
        <ScrollView className="flex-1">
          <View className="h-screen">{children}</View>
        </ScrollView>
      </MyView>
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation />
      </View>
    </View>
  );
};

export default NavigationLayout;
