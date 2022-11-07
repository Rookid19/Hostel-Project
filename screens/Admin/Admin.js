import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { SafeAreaView } from "react-native-safe-area-context";
import * as ImagePicker from "expo-image-picker";

const Admin = () => {
  const [image, setImage] = useState(null);
  // const [imageUrl, setImageUrl] = useState("");
  //camera permissions
  useEffect(() => {
    (async () => {
      if (Platform.OS !== "web") {
        const { status } = await ImagePicker.getMediaLibraryPermissionsAsync;
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

    // console.log("result---> " + result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
      // setImage("dsf");
      // setImage(
      //   <Text style={{ textAlign: "center" }}>Uploaded Succesfully</Text>
      // );
      let uri = result.uri;
      let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);
      //  setImage(fileExtension);
      console.log("file extension--->  " + fileExtension);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {!image ? (
          <TouchableOpacity
            style={styles.imageUploadContainer}
            onPress={pickImage}
          >
            <Text style={styles.uploadImageText}>Choose Image</Text>
          </TouchableOpacity>
        ) : (
          <Image
            source={{ uri: image }}
            style={{ height: 300, width: "100%", marginBottom: 30 }}
          />
        )}
        <CustomTextInput label="name" />
        <CustomTextInput label="Location" />
        <CustomTextInput label="Fees" />
        <CustomTextInput label="Status" />
        <CustomTextInput label="Description" description={true} />
        <StyledButton>
          <StyledButtonText>Submit</StyledButtonText>
        </StyledButton>
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
