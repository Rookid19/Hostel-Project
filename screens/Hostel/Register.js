import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [studentId, setIdStudent] = useState("");
  const [contact, setContact] = useState("");
  const [program, setLrogram] = useState("");
  const [level, setLevel] = useState("");
  const [guradingName, setGuardingName] = useState("");
  const [guardianContact, setguardianContact] = useState("");

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.space}></Text>
      <CustomTextInput label="First name" icon="user"/>
      <CustomTextInput label="Last name" icon="user"/>
      <CustomTextInput label="Student ID" icon="credit-card"/>
      <CustomTextInput label="Contact" icon="phone-call"/>
      <CustomTextInput label="Program" icon="layout"/>
      <CustomTextInput label="Level"icon="layers" />
      <CustomTextInput label="Guardian Name" icon="user"/>
      <CustomTextInput label="Guardian Contact" icon="phone-call"/>
      <StyledButton style={styles.button}>
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
