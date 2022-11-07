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
import { CustomModal } from "../../components/CustomModal";
import { Ionicons } from "@expo/vector-icons";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fees, setFees] = useState("");
  const [description, setDescription] = useState("");

  const valid =
    status != "" && name != "" && location != "" && fees != "" && description;

  const submit = () => {
    setDoc(doc(db, "Admin", "hostels", name, "info"), {
      name,
      location,
      fees,
      description,
      status,
    }).catch((error) => alert(error.message));
  };

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
        {visible && (
          <CustomModal setVisible={setVisible} setStatus={setStatus} />
        )}
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
        <CustomTextInput
          label="name"
          icon="home"
          onChangeText={(text) => setName(text)}
          value={name}
        />
        <CustomTextInput
          label="Location"
          icon="location"
          location={true}
          onChangeText={(text) => setLocation(text)}
          value={location}
        />
        <CustomTextInput
          label="Fees"
          icon="briefcase"
          onChangeText={(text) => setFees(text)}
          value={fees}
          keyboardType="numeric"
        />
        <Text style={styles.label}>Vacancy</Text>
        <TouchableOpacity
          style={styles.statusInput}
          onPress={() => setVisible(true)}
          activeOpacity={1}
        >
          <Text style={styles.statusLabel}>{status}</Text>
          <Ionicons
            name="ios-chevron-down-outline"
            size={20}
            color="black"
            style={styles.icon}
          />
        </TouchableOpacity>
        <CustomTextInput
          label="Description"
          description={true}
          multiline={true}
          onChangeText={(text) => setDescription(text)}
          value={description}
        />
        <StyledButton style={styles.button} disabled={!valid} onPress={submit}>
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
  statusInput: {
    height: 49,
    width: "80%",
    paddingVertical: 15,
    paddingHorizontal: 18,
    backgroundColor: Colors.lighterGray,
    alignSelf: "center",
    marginVertical: 10,
    marginBottom: 15,
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  statusLabel: {
    fontSize: 16,
    fontFamily: "Medium",
  },
  label: {
    fontSize: 16,
    fontFamily: "Helvetica",
    color: Colors.black,
    marginLeft: "10%",
  },
  button: {
    marginVertical: 20,
  },
});
