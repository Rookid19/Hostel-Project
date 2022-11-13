import {
  createContext,
  createRef,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { bottomSheetPage } from "../components/BottomSheetProvider";
import Animated from "react-native-reanimated";
import BottomSheet from "reanimated-bottom-sheet";
import { Text } from "react-native";
import { auth, db } from "../firebase";
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  setDoc,
} from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  updateProfile,
} from "firebase/auth";
import { useNavigation } from "@react-navigation/native";

export const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  //navigation hook
  const navigation = useNavigation();
  // bottom sheet refs
  const bs = useRef(0);
  const fall = new Animated.Value(1);
  const [user, setUser] = useState(false);
  const [sheetHeight, setSheetHeight] = useState(300);
  const [bottomSheetId, setBottomSheetId] = useState(null);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [hostelsData, setHostelsData] = useState([]);

  //open bottom sheet
  const openSheet = (id, height) => {
    setBottomSheetId(id);
    setSheetHeight(300);
    bs.current.snapTo(0);
  };

  //close bottom sheet
  const closeSheet = () => {
    // setColor(white);
    bs.current.snapTo(1);
    // setDisable(false);
  };

  //sign up
  const signUp = async (
    firstName,
    lastName,
    email,
    level,
    password,
    setEditable,
    setDisable
  ) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        updateProfile(auth.currentUser, {
          displayName: firstName,
        });
        db,
          setDoc(doc(db, "UserInfo", email, "Profile", "Details"), {
            firstName,
            lastName,
            email,
            level,
            password,
            payment: false,
          })
            .catch((error) => {
              setEditable(true);
              setDisable(false);
              closeSheet();
              alert(error.message);
            })
            .then(() => {
              setEditable(true);
              setDisable(false);
              closeSheet();
              navigation.navigate("Dashboard");
            });
      })
      .catch((error) => {
        setEditable(true);
        setDisable(false);
        closeSheet();
        alert(error.message);
      });
  };

  //sign out
  const userSignOut = () => {
    signOut(auth)
      //  .then(() => {
      //     navigation.navigate("Welcome");
      //  })
      .catch((error) => alert(error.message));
    // .finally(() => setSignOutLoading(<ButtonText>Sign Out</ButtonText>));
  };

  //Checks if there is a user Logged In
  useEffect(
    () =>
      onAuthStateChanged(auth, (user) => {
        if (user) {
          // navigation.navigate("Enter Passcode");
          setUser(user);
        } else {
          setUser(null);
          // navigation.navigate("Welcome")
          // alert("no user");
          // setLoadingInitial(false);
        }
        setLoadingInitial(false);
      }),

    []
  );

  useEffect(
    () =>
      onSnapshot(
        query(collection(db, "Admin", "hostels", "info")),
        (snapshot) => {
          setHostelsData(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        }
      ),
    []
  );

  // console.log("hostel data--- > " + hostelsData[0].data?.name);

  // allows you to memoize expensive functions so that you can avoid calling them on every render
  const memoVaue = useMemo(
    () => ({
      user,
      setUser,
      bs,
      fall,
      openSheet,
      closeSheet,
      userSignOut,
      hostelsData,
    }),
    [user, openSheet, closeSheet, bs, hostelsData]
  );

  //Checks if there is a user Logged In

  return (
    <AuthContext.Provider value={memoVaue}>
      {!loadingInitial && children}
      <BottomSheet
        ref={bs}
        snapPoints={[sheetHeight, 0]}
        renderContent={() => bottomSheetPage(bottomSheetId, sheetHeight)}
        initialSnap={1}
        callbackNode={fall}
      />
    </AuthContext.Provider>
  );
};

export default function useAuth() {
  return useContext(AuthContext);
}
