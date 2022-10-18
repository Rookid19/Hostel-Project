import React from "react";
import { StyleSheet, Text, View } from "react-native";
import LottieView from "lottie-react-native";
import { Colors } from "../utils/styles";

export const bottomSheetPage = (bottomSheetId, sheetHeight) => (
  <View style={[styles.container, { height: sheetHeight }]}>
    {bottomSheetId == 1 ? (
      <>
        <LottieView
          source={require("../assets/animation/processing.json")}
          style={styles.lottieView}
          autoPlay
          speed={1}
        />
        <Text style={styles.info}>
          Hang on your account will be created within some few minutes
        </Text>
      </>
    ) : null}
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    elevation: 6,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  lottieView: {
    height: 250,
    alignSelf: "center",
  },
  info: {
    marginHorizontal: 20,
    textAlign: "center",
    fontSize: 16,
    fontFamily: "Regular",
  },
});
