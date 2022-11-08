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
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
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

  // allows you to memoize expensive functions so that you can avoid calling them on every render
  const memoVaue = useMemo(
    () => ({
      user,
      bs,
      fall,
      openSheet,
      closeSheet,
      signUp,
    }),
    [user, openSheet, closeSheet, signUp, bs]
  );

  //Checks if there is a user Logged In
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // navigation.navigate("Dashboard");
        setUser(true);
      } else {
        setUser(null);
      }
      setLoadingInitial(false);
    });
    [user];
  });

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
