import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Colors } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";

const Dashboard = ({ navigation }) => {
  const image =
    "https://cdn.dribbble.com/userupload/3677390/file/original-f57fd4cc963537fdbb5b7089ba598620.png?compress=1&resize=400x300&vertical=top";
  const popularHostel = [
    {
      id: "1",
      img: image,
      location: "Ayensu",
      name: "Ayensu Plaza",
      fees: 3000,
      vacancy: true,
      description:
        "My name is barry allen and i am the fastest man alive How to damage your file so that no one can open it. Actual: you have not done your homework, and the teacher is waiting for the finished work. Or the project is not ready, and the boss is waiting for completion. To make excuses to a person, there is a simple and proven way — to damage the file so that the recipient does not open it. The free site Corrupt a file (http://corrupt-a-file.net/) is designed with this purpose in mind. Plausibly name any file, send it to the site and wait a couple of seconds — the service will return an already damaged document. If you try to open the file, a technical error will pop up. Download the received file or instantly send it to the cloud storage — and you're done!",
    },
    {
      id: "2",
      img: image,
      location: "Ayensu",
      name: "Ayensu Plaza",
      fees: 3000,
      vacancy: true,
      description:
        "My name is barry allen and i am the fastest man alive How to damage your file so that no one can open it. Actual: you have not done your homework, and the teacher is waiting for the finished work. Or the project is not ready, and the boss is waiting for completion. To make excuses to a person, there is a simple and proven way — to damage the file so that the recipient does not open it. The free site Corrupt a file (http://corrupt-a-file.net/) is designed with this purpose in mind. Plausibly name any file, send it to the site and wait a couple of seconds — the service will return an already damaged document. If you try to open the file, a technical error will pop up. Download the received file or instantly send it to the cloud storage — and you're done!",
    },
    {
      id: "3",
      img: image,
      location: "Ayensu",
      name: "Ayensu Plaza",
      fees: 3000,
      vacancy: true,
      description:
        "My name is barry allen and i am the fastest man alive How to damage your file so that no one can open it. Actual: you have not done your homework, and the teacher is waiting for the finished work. Or the project is not ready, and the boss is waiting for completion. To make excuses to a person, there is a simple and proven way — to damage the file so that the recipient does not open it. The free site Corrupt a file (http://corrupt-a-file.net/) is designed with this purpose in mind. Plausibly name any file, send it to the site and wait a couple of seconds — the service will return an already damaged document. If you try to open the file, a technical error will pop up. Download the received file or instantly send it to the cloud storage — and you're done!",
    },
    {
      id: "4",
      img: image,
      location: "Ayensu",
      name: "Ayensu Plaza",
      fees: 3000,
      vacancy: true,
      description:
        "My name is barry allen and i am the fastest man alive How to damage your file so that no one can open it. Actual: you have not done your homework, and the teacher is waiting for the finished work. Or the project is not ready, and the boss is waiting for completion. To make excuses to a person, there is a simple and proven way — to damage the file so that the recipient does not open it. The free site Corrupt a file (http://corrupt-a-file.net/) is designed with this purpose in mind. Plausibly name any file, send it to the site and wait a couple of seconds — the service will return an already damaged document. If you try to open the file, a technical error will pop up. Download the received file or instantly send it to the cloud storage — and you're done!",
    },
  ];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Ionicons
          name="home-outline"
          size={30}
          color={Colors.blackishBlue}
          style={styles.icon}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
          <Feather
            name="user"
            size={30}
            color={Colors.blackishBlue}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <Text style={styles.name}>Hi {auth?.currentUser?.displayName}</Text>
      <Text style={styles.title}>Find your hostel</Text>
      <CustomTextInput search={true} icon="search" />

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.row}>
              <Text style={[styles.title, styles.popularText]}>
                Popular Hostels
              </Text>
              <Text style={styles.smallText}>My hostel</Text>
            </View>

            <FlatList
              data={popularHostel}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
              horizontal
              renderItem={({ item }) => (
                <View style={styles.itemWrapper}>
                  <Image source={{ uri: item.img }} style={styles.image} />
                  <View style={styles.row}>
                    <View
                      style={{
                        paddingHorizontal: 7,
                        marginRight: 2,
                        flex: 0.85,
                      }}
                    >
                      <Text style={styles.subTitle}>Ayensu Plaza dsfsdfa</Text>
                      <View style={[styles.row1]}>
                        <Ionicons
                          name="location-outline"
                          size={13}
                          color={Colors.gray}
                        />
                        <Text style={styles.location}>Kwraprow</Text>
                      </View>
                    </View>
                    <View
                      style={[
                        styles.row1,
                        {
                          alignSelf: "center",
                          marginRight: 5,
                          marginTop: 12,
                        },
                      ]}
                    >
                      <Ionicons
                        name="star"
                        size={13}
                        color={Colors.pinkishRed}
                        style={styles.star}
                      />
                      <Text style={styles.rating}>4.8</Text>
                    </View>
                  </View>
                </View>
              )}
              bot
            />
          </>
        }
        data={popularHostel}
        renderItem={({ item }) => (
          <>
            {item.id == "1" && (
              <Text style={[styles.title, { marginTop: 30, marginBottom: 5 }]}>
                Find your hostel
              </Text>
            )}
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("Hostel Details", {
                  img: item.img,
                  location: item.location,
                  name: item.name,
                  fees: item.fees,
                  vacancy: true,
                  description: item.description,
                })
              }
            >
              <Image source={{ uri: item.img }} style={styles.image2} />
              <View style={styles.card}>
                <Text style={styles.subTitle}>Ayensu Plaza dsfsdfa jhkj</Text>
                <View style={[styles.row1, { marginTop: 5 }]}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={Colors.gray}
                  />
                  <Text style={styles.location}>Kwraprow</Text>
                </View>
                <View
                  style={[styles.row1, { justifyContent: "space-between" }]}
                >
                  <Text style={styles.subTitle}>GHS 3000</Text>
                  <Text style={styles.room}>Room Available</Text>
                </View>
              </View>
            </TouchableOpacity>
          </>
        )}
      />
    </SafeAreaView>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  header: {
    flexDirection: "row",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    marginTop: 20,
  },
  title: {
    fontFamily: "Medium",
    fontSize: 22,
    paddingHorizontal: 20,
    color: Colors.blackishBlue,
  },
  name: {
    fontSize: 16,
    paddingHorizontal: 20,
    marginVertical: 15,
    fontFamily: "Regular",
  },
  subTitle: {
    fontFamily: "Bold",
    fontSize: 15,
    marginTop: 10,
    color: Colors.blackishBlue,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  popularText: {
    marginBottom: 20,
    marginTop: 15,
  },
  smallText: {
    fontSize: 16,
    fontFamily: "Regular",
    color: Colors.gray,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 15,
  },

  itemWrapper: {
    marginRight: 15,
    backgroundColor: Colors.white,
    width: 160,
    height: 200,
    borderRadius: 15,
    // shadowColor: "#000",
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.29,
    // shadowRadius: 4.65,
    // elevation: 2,
  },
  itemContainer: {
    marginHorizontal: 15,
    marginVertical: 8,
    backgroundColor: Colors.white,
    height: 100,
    borderRadius: 15,
    flexDirection: "row",
  },
  card: {
    justifyContent: "center",
    marginLeft: 10,
    // backgroundColor: "blue",
    flex: 1,
  },
  image: {
    height: 130,
    width: "100%",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  row1: {
    flexDirection: "row",
    // alignItems: "center",
  },
  location: {
    fontFamily: "Regular",
    color: Colors.gray,
    fontSize: 13,
  },
  rating: {
    fontFamily: "Bold",
    fontSize: 11,
    // marginTop: 11,
    color: Colors.blackishBlue,
    // marginLeft: -10,
  },
  image2: {
    height: "80%",
    width: 80,
    alignSelf: "center",
    marginLeft: 10,
    borderRadius: 15,
  },
  room: {
    fontSize: 16,
    fontFamily: "Bold",
    alignSelf: "flex-end",
    marginRight: 10,
    color: Colors.pinkishRed,
  },
});
