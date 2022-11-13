import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { auth, db } from "../../firebase";
import LottieView from "lottie-react-native";

const Register = ({ route }) => {
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

  const valid = firstName != "";
  // &&
  // lastName != "" &&
  // studentId != "" &&
  // contact != "" &&
  // program &&
  // level != "" &&
  // guardianName != "" &&
  // guardianContact != "";

  const submit = async () => {
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
    setLoading(<StyledButtonText>Register</StyledButtonText>);
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
