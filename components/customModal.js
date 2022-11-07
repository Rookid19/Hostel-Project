import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";

const customModal = () => {
  return (
    <TouchableOpacity>
      <Text>Room Available</Text>
      <Text>No Rooms Available</Text>
    </TouchableOpacity>
  );
};

export default customModal;

const styles = StyleSheet.create({});
