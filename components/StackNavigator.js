import { StyleSheet } from "react-native";
import React from "react";
import Welcome from "../screens/Welcome";
import useAuth from "../hooks/useAuth";
import Dashboard from "../screens/Dashboard/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CreateAccount from "../screens/Auth/CreateAccount";
import SignIn from "../screens/Auth/SignIn";
import Admin from "../screens/Admin/Admin";
import HostelDetails from "../screens/Hostel/HostelDetails";
import Register from "../screens/Hostel/Register";
import Profile from "../screens/Auth/Profile";

const StackNavigator = () => {
  //screen options
  const globalScreenOptions = {
    headerStyle: { backgroundColor: "#fff" },
    headerTitleStyle: {
      color: "black",
      textAlign: "center",
    },
    headerTitle: "",
    headerBackTitle: "",
    headerTintColor: "black", //changes any icon color in the header to white
    // gestureEnabled: true,
  };

  const headerTitle = {
    fontFamily: "Bold",
    fontSize: 24,
  };

  //useAuth Hook
  const { user } = useAuth();
  // const user = false

  // handles all routing in the app
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={globalScreenOptions}
      // initialRouteName="Admin Page"
    >
      {user ? (
        <>
          <Stack.Screen
            name="Dashboard"
            options={{ headerShown: false }}
            component={Dashboard}
          />
          <Stack.Screen
            name="Profile"
            options={{
              headerTitle: "Profile",
              headerTitleAlign: "center",
              headerTitleStyle: headerTitle,
            }}
            component={Profile}
          />
          <Stack.Screen
            name="Hostel Details"
            options={{
              headerTitle: "Hostel Details",
              headerTitleAlign: "center",
              headerTitleStyle: headerTitle,
            }}
            component={HostelDetails}
          />
          <Stack.Screen
            name="Register Hostel"
            options={{
              headerTitle: "Regisration",
              headerTitleAlign: "center",
              headerTitleStyle: headerTitle,
            }}
            component={Register}
          />
        </>
      ) : (
        <>
          <Stack.Screen
            name="Welcome"
            options={{ headerShown: false }}
            component={Welcome}
          />
          <Stack.Screen
            name="Create Account"
            options={{
              headerTitle: "Create Account",
              headerTitleAlign: "center",
              headerTitleStyle: headerTitle,
            }}
            component={CreateAccount}
          />
          <Stack.Screen
            name="Sign In"
            options={{
              headerTitle: "Sign In",
              headerTitleAlign: "center",
              headerTitleStyle: headerTitle,
            }}
            component={SignIn}
          />
          <Stack.Screen
            name="Admin Page"
            options={{ headerShown: false }}
            component={Admin}
          />
        </>
      )}
    </Stack.Navigator>
  );
};

export default StackNavigator;
