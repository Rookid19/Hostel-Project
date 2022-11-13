import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { FontAwesome } from "@expo/vector-icons";
import { Colors } from "../../utils/styles";
import useAuth from "../../hooks/useAuth";

const Profile = () => {
  const { userSignOut } = useAuth();

  return (
    <View style={styles.container}>
      <FontAwesome
        name="user-circle"
        size={80}
        color={Colors.gray}
        style={styles.icon}
      />

      <View style={styles.card}>
        <TouchableOpacity style={styles.signOut} onPress={userSignOut}>
          <Text style={styles.signOutText}>Sign out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  icon: {
    alignSelf: "center",
    marginTop: 30,
  },
  card: {
    height: 300,
    width: "90%",
    alignSelf: "center",
    backgroundColor: Colors.white,
  },
  signOut: {
    alignSelf: "center",
    bottom: 0,
    position: "absolute",
    marginBottom: 20,
  },
  signOutText: {
    fontSize: 22,
    fontFamily: "Medium",
  },
});
