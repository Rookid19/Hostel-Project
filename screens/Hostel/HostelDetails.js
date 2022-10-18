import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React, { useState } from "react";
import { Colors, StyledButton, StyledButtonText } from "../../utils/styles";
import { Ionicons } from "@expo/vector-icons";

const HostelDetails = ({ navigation, route }) => {
  const [img] = useState(route?.params?.img);
  const [location] = useState(route?.params?.location);
  const [name] = useState(route?.params?.name);
  const [fees] = useState(route?.params?.fees);
  const [vacancy] = useState(route?.params?.vacancy);
  const [description] = useState(route?.params?.description);
  const [aboutEllipse, setAboutEllipse] = useState(4);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <Image source={{ uri: img }} style={{ height: 400 }} />
        {/* Info section */}
        <View>
          <Text style={styles.title}>{name}</Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ marginLeft: 20, marginTop: 10 }}>
              <View style={{ flexDirection: "row" }}>
                <Ionicons
                  name="location-outline"
                  size={13}
                  color={Colors.gray}
                />
                <Text style={styles.location}>{location}</Text>
              </View>
              <Text style={styles.vacancy}>
                {vacancy ? "Room Available" : "Full"}
              </Text>
            </View>
            <Text style={styles.fees}>GHS {fees.toFixed(2)}</Text>
          </View>
        </View>
        {/* Description section */}
        <View>
          <Text style={styles.title}>Description</Text>
          <Text style={styles.description} numberOfLines={aboutEllipse}>
            {description}
          </Text>
          <TouchableOpacity
            onPress={
              aboutEllipse == 4
                ? () => setAboutEllipse(0)
                : () => setAboutEllipse(4)
            }
          >
            <Text style={styles.viewMore}>
              {aboutEllipse == 0 ? "View less" : "View More"}
            </Text>
          </TouchableOpacity>
        </View>
        <StyledButton
          style={styles.button}
          onPress={() => navigation.navigate("Register Hostel")}
        >
          <StyledButtonText>Book Now</StyledButtonText>
        </StyledButton>
      </ScrollView>
    </View>
  );
};

export default HostelDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,

    backgroundColor: Colors.bg,
  },
  button: {
    backgroundColor: Colors.lightBlue,
    marginBottom: 20,
  },
  title: {
    fontFamily: "Bold",
    fontSize: 18,
    color: Colors.blackishBlue,
    marginLeft: 20,
    marginTop: 30,
  },
  description: {
    fontFamily: "Regular",
    fontSize: 14,
    lineHeight: 25,
    color: Colors.gray,
    marginHorizontal: 20,
  },
  viewMore: {
    marginLeft: 20,
    color: Colors.lightBlue,
    marginVertical: 15,
  },
  location: {
    fontFamily: "Regular",
    color: Colors.gray,
    fontSize: 13,
  },
  fees: {
    color: Colors.pinkishRed,
    fontFamily: "Bold",
    fontSize: 25,
    marginRight: 20,
    marginTop: 20,
  },
  vacancy: {
    marginTop: 3,
    fontSize: 15,
    fontFamily: "Regular",
    color: Colors.gray,
  },
});
