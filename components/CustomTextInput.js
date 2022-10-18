import { Platform, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Colors, LeftIcon, RightIcon, StyledTextInput } from "../utils/styles";
import { Feather, Ionicons } from "@expo/vector-icons";

const { white } = Colors;

const CustomTextInput = ({
  label,
  icon,
  icon1,
  hidePassword,
  setHidePassword,
  isPassword,
  search,
  ...props
}) => {
  return (
    <View>
      <Text style={styles.label}>{label}</Text>
      <StyledTextInput {...props} style={[search && styles.search, {}]} />
      <LeftIcon style={{ flexDirection: "row" }}>
        <Feather
          name={icon}
          size={24}
          color="black"
         style={search && styles.searchIcon}
        />
      </LeftIcon>
      {isPassword && (
        <RightIcon
          onPress={() => {
            setHidePassword(!hidePassword);
          }}
        >
          <Ionicons
            name={icon1}
            size={25}
            color={Colors.black}
          />
        </RightIcon>
      )}
      {search && (
        <RightIcon style={styles.iconWrapper}>
          <Ionicons
            name="options"
            size={24}
            color={Colors.white}
            style={styles.icon}
          />
        </RightIcon>
      )}
    </View>
  );
};

export default CustomTextInput;

const styles = StyleSheet.create({
  label: {
    fontSize: 18,
    fontFamily: "Regular",
    marginLeft: "10%",
  },
  search: {
    width: "90%",
    backgroundColor: white,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    // elevation: 3,
  },
  icon: {
    alignSelf: "center",
    marginTop: 2,
  },
  iconWrapper: {
    marginRight: -20,
    marginTop : Platform.OS == "ios"?  -10: 0,
    backgroundColor: Colors.lightBlue,
    width: 30,
    shadowColor: Colors.lightBlue,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    height: 30,
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 17,
    borderRadius: 5,
  },
  searchIcon: {
    marginLeft: -20,
    marginTop: Platform.OS == "android" ? 4 : -4,
  },
});
