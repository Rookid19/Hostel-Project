import { StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../../components/CustomTextInput";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";
import LottieView from "lottie-react-native";
import useAuth from "../../hooks/useAuth";

const SignIn = ({ navigation }) => {
  const { setUser, user } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
      <LottieView
        source={require("../../assets/animation/activityIndicator.json")}
        style={styles.lottieView}
        autoPlay
        speed={1}
      />;
      signInWithEmailAndPassword(auth, email, password).catch((error) => {
        alert(error.message);
        setLoading(
          <StyledButtonText style={styles.regular}>Submit</StyledButtonText>
        );
      });
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
  lottieView: {
    height: 25,
    alignSelf: "center",
  },
});
