import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { db, storage } from "../../firebase";
import LottieView from "lottie-react-native";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const Admin = () => {
  const [image, setImage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState("");
  const [name, setName] = useState("");
  const [location, setLocation] = useState("");
  const [fees, setFees] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(
    <StyledButtonText>Submit</StyledButtonText>
  );
  const [extension, setExtension] = useState("");

  const valid =
    status != "" &&
    name != "" &&
    location != "" &&
    fees != "" &&
    description &&
    image != null;

  const submit = async () => {
    setLoading(
      <LottieView
        source={require("../../assets/animation/activityIndicator.json")}
        style={styles.lottieView}
        autoPlay
        speed={1}
      />
    );

    const blob = await new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.onload = function () {
        resolve(xhr.response);
      };
      xhr.onerror = function () {
        reject(new TypeError("Network request failed"));
      };
      xhr.responseType = "blob";
      xhr.open("GET", image, true);
      xhr.send(null);
    });

    // get file name from file

    const storageRef = ref(
      storage,
      "hostel" + new Date().toISOString() + "." + extension
    );

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //    setProgress(progress);
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused": // or 'paused'
            console.log("Upload is paused");
            break;
          case "running": // or 'running'
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
        alert(error.message);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("download url --- > " + downloadURL);
          setDoc(
            doc(db, "Admin", "hostels", name, "info"),
            {
              name,
              location,
              fees,
              description,
              status,
              image: downloadURL,
            },
            {
              merge: true,
            }
          ).catch((error) => alert(error.message));
          setLoading(<StyledButtonText>Submit</StyledButtonText>);
          setName("");
          setLocation("");
          setFees("");
          setStatus("");
          setDescription();
          setImage(null);
        });
      }
    );
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
      let uri = result.uri;
      let fileExtension = uri.substr(uri.lastIndexOf(".") + 1);
      setExtension(fileExtension);
      // console.log("file extension--->  " + fileExtension);
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
          {loading}
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
    fontFamily: "Medium",
    color: Colors.black,
    marginLeft: "10%",
  },
  button: {
    marginVertical: 20,
  },
  lottieView: {
    height: 25,
    alignSelf: "center",
  },
});
