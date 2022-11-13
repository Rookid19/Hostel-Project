import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { Colors } from "../../utils/styles";

const Chat = ({ navigation, route }) => {
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
  return (
    <ScrollView style={styles.container}>
      <Text>Chat</Text>
    </ScrollView>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },
});
