import {
  ScrollView,
  StyleSheet,
  Text,
  SafeAreaView,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  TextInput,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { Colors } from "../../utils/styles";
import { StatusBar } from "expo-status-bar";
import { AntDesign, FontAwesome, Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

// import { SafeAreaView } from "react-native-safe-area-context";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontFamily: "Medium" }}>
          {route?.params?.chatName}
        </Text>
      ),
    });
  }, [navigation]);

  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, "chats", route?.params?.id, "messages"), {
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
    setInput("");
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView></ScrollView>
            <View style={styles.footer}>
              <TextInput
                placeholder="Message"
                style={styles.textInput}
                value={input}
                onSubmitEditing={sendMessage}
                onChangeText={(text) => setInput(text)}
              />
              <TouchableOpacity onPress={sendMessage} activeOpacity={0.5}>
                <Ionicons name="send" size={24} color="#2B68E6" />
              </TouchableOpacity>
            </View>
          </>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
  reciever: {
    padding: 15,
    backgroundColor: "#ECECEC",
    alignSelf: "flex-end",
    borderRadius: 20,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 20,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  reciverText: {
    color: "black",
    fontWeight: "500",
    marginLeft: 10,
    marginBottom: 15,
  },
  reciverName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },

  footer: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
  },
  textInput: {
    bottom: 0,
    height: 40,
    flex: 1,
    marginRight: 15,
    //borderColor:"transparent",
    backgroundColor: "#ECECEC",
    //borderWidth: 1,
    padding: 10,
    color: "grey",
    borderRadius: 30,
  },
});
