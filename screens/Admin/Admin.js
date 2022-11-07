import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const Admin = () => {
  const [image, setImage] = useState(null);

  //camera permissions
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync
        if (status !== "granted") {
          // alert("Sorry, we need camera roll permissions to make this work!");
        }
      }
    })();
  }, []);

  //choosing image from gallery
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
       mediaTypes: ImagePicker.MediaTypeOptions.All,
       allowsEditing: true,
       aspect: [4, 3],
       quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
       setImage1Address(result.uri);
       setImage1(
          <Text style={{ textAlign: "center" }}>Uploaded Succesfully</Text>
       );
       let uri = result.uri;
       let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);
       setImage1Extention(fileExtension);
    }
 };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!image ? (
          <TouchableOpacity style={styles.imageUploadContainer}>
            <Text style={styles.uploadImageText}>Choose Image</Text>
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
  );
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
    fontFamily: "Bold",
    fontSize: 18,
  },
});
