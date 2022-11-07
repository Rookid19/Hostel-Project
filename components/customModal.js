import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

const { height } = Dimensions.get("window");

export const CustomModal = ({ setStatus, setVisible }) => {
  // select
  const select = (text) => {
    setStatus(text);
    setVisible(false);
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => select("Rooms Available")}>
        <Text style={styles.label}>Rooms Available</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => select("No Rooms Available")}>
        <Text style={styles.label}>No Rooms Available</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: height / 2,
    borderRadius: 5,
    width: "80%",
    elevation: 6,
    zIndex: 10,
    backgroundColor: "white",
    alignSelf: "center",
    justifyContent: "center",
    height: "auto",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 20,
    marginLeft: 10,
    lineHeight: 30,
    marginVertical: 5,
    fontFamily: "Medium",
  },
});
