import { StyleSheet, Text, View, ImageBackground } from "react-native";
import React from "react";
import backgroundImage from "../assets/images/hostel.jpg";
import { StatusBar } from "expo-status-bar";
import { Colors, StyledSemiButton } from "../utils/styles";

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <ImageBackground style={styles.image} source={backgroundImage}>
        <Text style={styles.title}>HOSTEL CONNECT</Text>
        <View style={styles.bottom}>
          <StyledSemiButton
            onPress={() => navigation.navigate("Create Account")}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </StyledSemiButton>
          <StyledSemiButton onPress={() => navigation.navigate("Sign In")}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </StyledSemiButton>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  title: {
    fontSize: 30,
    fontFamily: "Bold",
    marginTop: 230,
    alignSelf: "center",
    color: Colors.gold,
    letterSpacing: 1,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-around",
    bottom: 0,
    position: "absolute",
    width: "100%",
    marginBottom: 100,
  },
  buttonText: {
    textAlign: "center",
    color: Colors.gold,
    fontSize: 20,
    fontFamily: "Medium",
  },
});
