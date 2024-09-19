import { Platform, SafeAreaView, ScrollView, View } from "react-native";

import BottomNavigation from "./navigation";

const NavigationLayout = ({
  children,
  safeArea = true,
  scroll = true,
}: {
  children: React.ReactNode;
  safeArea?: boolean;
  scroll?: boolean;
}) => {
  const MyView = safeArea ? SafeAreaView : View;
  const MyScrollView = scroll ? ScrollView : View;

  return (
    <View className="relative h-full w-full bg-background">
      <MyView
        className="flex-1"
        style={
          safeArea ? { paddingTop: Platform.OS === "android" ? 50 : 0 } : {}
        }
      >
        <MyScrollView className="flex-1">
          <View className={Platform.OS === "ios" ? "h-[90vh]" : "h-screen"}>
            {children}
          </View>
        </MyScrollView>
      </MyView>
      <View className="absolute bottom-0 left-0 right-0">
        <BottomNavigation />
      </View>
    </View>
  );
};

export default NavigationLayout;
