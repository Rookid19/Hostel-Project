import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { SafeAreaView } from "react-native-safe-area-context";

const Admin = () => {
  const [image, setImage] = useState(null);
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!image ? (
          <TouchableOpacity style={styles.imageUploadContainer}>
            <Text style={styles.uploadImageText}>Upload Image</Text>
          </TouchableOpacity>
        ) : (
          <Image />
        )}
        <CustomTextInput label="name" />
        <CustomTextInput label="Location" />
        <CustomTextInput label="Fees" />
        <CustomTextInput label="Status" />
        <CustomTextInput label="Description" description={true} />
      </ScrollView>
    </SafeAreaView>
  )
};

export default Admin;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  imageUploadContainer: {
    height: 220,
    alignItems: "center",
    justifyContent: "center",
  },
  uploadImageText: {
    color: Colors.lightBlue,
    fontFamily:"Bold",
    fontSize:18
  },
});
