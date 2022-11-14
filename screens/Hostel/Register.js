import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import LottieView from "lottie-react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Register = ({ route, navigation }) => {
  const [hostelName] = useState(route?.params?.name);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [contact, setContact] = useState("");
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");
  const [loading, setLoading] = useState(
    <StyledButtonText>Register</StyledButtonText>
  );

  const valid =
    firstName != "" &&
    lastName != "" &&
    studentId != "" &&
    contact != "" &&
    program &&
    level != "" &&
    guardianName != "" &&
    guardianContact != "";

  const submit = async () => {
    let hostel_name = await AsyncStorage.getItem("my_hostel");

    if (hostel_name != null) {
      alert("You cannot select more than 1 hostels");
    } else {
      setLoading(
        <LottieView
          source={require("../../assets/animation/activityIndicator.json")}
          style={styles.lottieView}
          autoPlay
          speed={1}
        />
      );
      setDoc(
        doc(db, "Admin", "usersHostels", hostelName, auth?.currentUser?.email),
        {
          hostelName,
          firstName,
          lastName,
          studentId,
          contact,
          program,
          level,
          guardianName,
          guardianContact,
        }
      ).catch((error) => alert(error.message));
      await AsyncStorage.setItem("my_hostel", hostelName);

      navigation.navigate("My Hostel");
      setLoading(<StyledButtonText>Register</StyledButtonText>);
    }
  };
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.space}></Text>
      <CustomTextInput
        label="First name"
        icon="user"
        onChangeText={(text) => setFirstName(text)}
        value={firstName}
      />
      <CustomTextInput
        label="Last name"
        icon="user"
        onChangeText={(text) => setLastName(text)}
        value={lastName}
      />
      <CustomTextInput
        label="Student ID"
        icon="credit-card"
        onChangeText={(text) => setStudentId(text)}
        value={studentId}
      />
      <CustomTextInput
        label="Contact"
        icon="phone-call"
        onChangeText={(text) => setContact(text)}
        value={contact}
        keyboardType="numeric"
      />
      <CustomTextInput
        label="Program"
        icon="layout"
        onChangeText={(text) => setProgram(text)}
        value={program}
      />
      <CustomTextInput
        label="Level"
        icon="layers"
        onChangeText={(text) => setLevel(text)}
        value={level}
        keyboardType="numeric"
      />
      <CustomTextInput
        label="Guardian Name"
        icon="user"
        onChangeText={(text) => setGuardianName(text)}
        value={guardianName}
      />
      <CustomTextInput
        label="Guardian Contact"
        icon="phone-call"
        onChangeText={(text) => setGuardianContact(text)}
        value={guardianContact}
        keyboardType="numeric"
      />
      <StyledButton style={styles.button} disabled={!valid} onPress={submit}>
        {loading}
      </StyledButton>
    </ScrollView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    marginBottom: 40,
    marginTop: 20,
  },
  lottieView: {
    height: 25,
    alignSelf: "center",
  },
});
