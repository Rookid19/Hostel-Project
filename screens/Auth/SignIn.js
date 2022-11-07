import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState("Admin@gmail.com");
  const [password, setPassword] = useState("Admin@123");
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(
    <StyledButtonText>Submit</StyledButtonText>
  );

  const signIn = () => {
    let Email = email.toLowerCase();
    let Password = password.toLowerCase();
    if (Email == "admin@gmail.com" && Password == "admin@123") {
      navigation.replace("Admin Page");
    } else {
      return null;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.space}></Text>
      <CustomTextInput
        value={email}
        label="Email"
        icon="credit-card"
        onChangeText={(text) => setEmail(text)}
      />

      <CustomTextInput
        value={password}
        label="Password"
        icon="lock"
        isPassword={true}
        hidePassword={hidePassword}
        secureTextEntry={hidePassword}
        setHidePassword={setHidePassword}
        icon1={hidePassword ? "eye-outline" : "eye-off-outline"}
        onChangeText={(text) => setPassword(text)}
      />
      <StyledButton style={styles.button} onPress={() => signIn()}>
        {loading}
      </StyledButton>
    </View>
  );
};

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  space: {
    marginTop: 30,
  },
  button: {
    marginTop: 30,
  },
});
