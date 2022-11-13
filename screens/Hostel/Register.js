import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { addDoc, collection, setDoc } from "firebase/firestore";
import { auth } from "../../firebase";

const Register = ({route}) => {
  const [hostelName] = useState(route?.params?.name);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [contact, setContact] = useState("");
  const [program, setProgram] = useState("");
  const [level, setLevel] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianContact, setGuardianContact] = useState("");

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
    setDoc(
      doc(db, "UserInfo", "hostels", hostelName, auth?.currentUser?.email),
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
    setLoading(<StyledButtonText>Submit</StyledButtonText>);
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
      <StyledButton style={styles.button} disabled={!valid}>
        <StyledButtonText>Register</StyledButtonText>
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
});
