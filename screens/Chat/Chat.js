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
  Platform,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { Colors } from "../../utils/styles";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebase";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";

// import { SafeAreaView } from "react-native-safe-area-context";

const Chat = ({ navigation, route }) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Chat",
      headerTitleAlign: "center",
      headerTitle: () => (
        <Text style={{ fontSize: 20, fontFamily: "Medium" }}>
          {route?.params?.chatName}
        </Text>
      ),
    });
  }, [navigation]);

  let uniqueChatID = [auth?.currentUser?.email, route?.params?.id]
    .sort()
    .join("");

  //send message functions
  const sendMessage = async () => {
    Keyboard.dismiss();

    await addDoc(collection(db, "chats", uniqueChatID, "messages"), {
      senderId: route?.params?.id,
      timestamp: serverTimestamp(),
      message: input,
      displayName: auth.currentUser.displayName,
      email: auth.currentUser.email,
    });
    setInput("");
  };

  useLayoutEffect(() => {
    const unsub = onSnapshot(
      query(
        collection(db, "chats", uniqueChatID, "messages"),
        orderBy("timestamp", "asc")
      ),
      (snapshot) => {
        setMessages(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            data: doc.data(),
          }))
        );
      }
    );
    return unsub;
  }, [route]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : null}
        style={styles.container}
        keyboardVerticalOffset={90}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <>
            <ScrollView contentContainerStyle={{ paddingTop: 15 }}>
              {messages.map(({ id, data }) =>
                data.email == auth.currentUser.email ? (
                  <View key={id} style={styles.reciever}>
                    <Text style={styles.recieverText}>{data.message} </Text>
                    {/* <Text style={styles.reciverName}>{data.displayName}</Text> */}
                  </View>
                ) : (
                  <View key={id} style={styles.sender}>
                    <Text style={styles.senderText}>{data.message}</Text>
                    {/* <Text style={styles.senderName}>{data.displayName}</Text> */}
                  </View>
                )
              )}
            </ScrollView>
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
    borderRadius: 15,
    marginRight: 15,
    marginBottom: 20,
    maxWidth: "80%",
    position: "relative",
  },
  sender: {
    padding: 15,
    backgroundColor: "#2B68E6",
    alignSelf: "flex-start",
    borderRadius: 15,
    margin: 15,
    maxWidth: "80%",
    position: "relative",
  },
  senderText: {
    color: "white",
    fontWeight: "500",
  },
  senderName: {
    left: 10,
    paddingRight: 10,
    fontSize: 10,
    color: "white",
  },
  recieverText: {
    color: "black",
    fontWeight: "500",
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
