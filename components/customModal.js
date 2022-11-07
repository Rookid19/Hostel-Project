import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

export const CustomModal = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Text style={styles.label}>Rooms Available</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.label}>No Rooms Available</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: "20%",
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
    fontSize: 16,
    marginLeft: 10,
    lineHeight: 30,
    marginVertical: 2,
  },
});
