import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import StackNavigator from "./components/StackNavigator";
import { AuthProvider } from "./hooks/useAuth";
import { useFonts } from "expo-font";

export default function App() {
  //loading fonts

  const [loaded] = useFonts({
    Regular: require("./assets/fonts/AthleticsRegular.ttf"),
    Bold: require("./assets/fonts/AthleticsBold.ttf"),
    Medium: require("./assets/fonts/AthleticsMedium.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <AuthProvider>
        <StackNavigator />
      </AuthProvider>
    </NavigationContainer>
  );
}
