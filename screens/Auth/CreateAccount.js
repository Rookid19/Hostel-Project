import { ScrollView, StyleSheet, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import useAuth from "../../hooks/useAuth";
import Animated from "react-native-reanimated";

const CreateAccount = () => {
  //useAuth hook
  const { openSheet, fall, signUp } = useAuth();
  const [hidePassword, setHidePassword] = useState(true);
  const [disable, setDisable] = useState(false);
  const [editable, setEditable] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [level, setLevel] = useState("");
  const [password, setPassword] = useState("");

  const submit = (firstName, lastName, email, level, password) => {
    setEditable(false);
    setDisable(true);
    openSheet(1, 300);
    signUp(
      firstName,
      lastName,
      email,
      level,
      password,
      setEditable,
      setDisable
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Animated.View
        style={{
          opacity: Animated.add(0.4, Animated.multiply(fall, 1)),
        }}
      >
        <TouchableOpacity
          activeOpacity={1}
          style={{ flex: 1 }}
          disabled={disable}
        >
          <Text style={styles.space}></Text>
          <CustomTextInput
            label="First name"
            icon="user"
            editable={editable}
            onChangeText={(text) => setFirstName(text)}
          />
          <CustomTextInput
            label="Last name"
            icon="user"
            editable={editable}
            onChangeText={(text) => setLastName(text)}
          />
          <CustomTextInput
            label="Email"
            icon="credit-card"
            editable={editable}
            onChangeText={(text) => setEmail(text)}
          />
          <CustomTextInput
            label="Level"
            keyboardType="numeric"
            icon="layers"
            editable={editable}
            onChangeText={(text) => setLevel(text)}
            maxLength={3}
            value={level}
          />

          <CustomTextInput
            label="Password"
            icon="lock"
            isPassword={true}
            editable={editable}
            hidePassword={hidePassword}
            secureTextEntry={hidePassword}
            setHidePassword={setHidePassword}
            icon1={hidePassword ? "eye-outline" : "eye-off-outline"}
            onChangeText={(text) => setPassword(text)}
          />
          <StyledButton
            style={styles.button}
            onPress={() => submit(firstName, lastName, email, level, password)}
          >
            <StyledButtonText>Submit</StyledButtonText>
          </StyledButton>
        </TouchableOpacity>
      </Animated.View>
    </ScrollView>
  );
};

export default CreateAccount;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  button: {
    marginTop: 50,
  },
});
