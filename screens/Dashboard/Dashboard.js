import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { Colors } from "../../utils/styles";
import CustomTextInput from "../../components/CustomTextInput";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { auth } from "../../firebase";
import useAuth from "../../hooks/useAuth";

const Dashboard = ({ navigation }) => {
  const { hostelsData } = useAuth();
  const [filteredDataSource, setFilteredDataSource] = useState(hostelsData);

  // Searh Functionality
  const searchFilterFunction = (text) => {
    // Check if searched text is not blank
    if (text) {
      // Inserted text is not blank
      // Filter the stocksData and update FilteredDataSource
      const newData = hostelsData?.filter(({ name }) => {
        // Applying filter for the inserted text in search bar
        const itemData = sector ? sector.toUpperCase() : "".toUpperCase();

        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(hostelsData);
      setSearch(text);
    }
  };
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
              data={hostelsData.slice(0, 5)}
              showsHorizontalScrollIndicator={false}
              style={{ paddingLeft: 20 }}
              horizontal
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <View style={styles.itemWrapper}>
                  <Image
                    source={{ uri: item?.data?.image }}
                    style={styles.image}
                  />
                  <View style={styles.row}>
                    <View
                      style={{
                        paddingHorizontal: 7,
                        marginRight: 2,
                        flex: 0.85,
                      }}
                    >
                      <Text style={styles.subTitle}>{item?.data?.name}</Text>
                      <View style={[styles.row1]}>
                        <Ionicons
                          name="location-outline"
                          size={13}
                          color={Colors.gray}
                          style={{ marginTop: 2 }}
                        />
                        <Text style={styles.location}>
                          {item?.data?.location}
                        </Text>
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
            />
          </>
        }
        data={hostelsData}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <>
            {item.id == hostelsData[0].id && (
              <Text style={[styles.title, { marginTop: 30, marginBottom: 5 }]}>
                Find your hostel
              </Text>
            )}
            <TouchableOpacity
              style={styles.itemContainer}
              onPress={() =>
                navigation.navigate("Hostel Details", {
                  img: item?.data?.image,
                  location: item?.data?.location,
                  name: item?.data?.name,
                  fees: item?.data?.fees,
                  vacancy: true,
                  description: item?.data?.description,
                })
              }
            >
              <Image
                source={{ uri: item?.data?.image }}
                style={styles.image2}
              />
              <View style={styles.card}>
                <Text style={styles.subTitle}>{item?.data?.name}</Text>
                <View style={[styles.row1, { marginTop: 5 }]}>
                  <Ionicons
                    name="location-outline"
                    size={13}
                    color={Colors.gray}
                  />
                  <Text style={styles.location}>{item?.data?.location}</Text>
                </View>
                <View
                  style={[styles.row1, { justifyContent: "space-between" }]}
                >
                  <Text style={styles.subTitle}>GHS {item?.data?.fees}</Text>
                  <Text style={styles.room}>{item?.data?.status}</Text>
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
    marginTop: 4,
  },
  rating: {
    fontFamily: "Bold",
    fontSize: 11,
    marginTop: 4,
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
