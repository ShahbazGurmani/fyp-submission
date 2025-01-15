import React, { useState, useContext } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { BookingContext } from "../../contextApi/BookingContext"; // Import BookingContext
import { useFavorites } from "../../contextApi/FavouriteContext"; // Import FavoritesContext
import CustomizedTextInput from "../../components/CustomizedTextInput";
import CustomizedButton from "../../components/CustomizedButton";
import imagePath from "../../constants/imagePath";
import navigationStrings from "../../constants/navigationStrings";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import { Snackbar } from "react-native-paper";
import { API_URL } from "../../../ipconfig";
export function Signin({ navigation, onSignIn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [notvisible, setNotVisible] = useState(true);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const { updateFavorites } = useFavorites(); // Access Favorites context

  const handleSignin = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password }
      );

      if (response.status === 200) {
        // Store user data in AsyncStorage
        await AsyncStorage.setItem("auth", JSON.stringify(response.data));

        // Retrieve and update favorites from AsyncStorage
        const storedFavorites = await AsyncStorage.getItem("favorites");
        if (storedFavorites) {
          updateFavorites(JSON.parse(storedFavorites));
        }

        onSignIn(); // Notify the app that the user has signed in

        // Navigate based on user role
        const userRole = response.data.user.role;
        if (userRole === 1) {
          setTimeout(() => {
            setSnackbarVisible(true);
          }, 2000);
        } else if (userRole === 2) {
          setTimeout(() => {
            setSnackbarVisible(true);
          }, 2000);
        } else {
          setTimeout(() => {
            navigation.replace(navigationStrings.TABROUTES);
          }, 0);
        }
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      
      setError(errorMessage);
      
      setSnackbarVisible(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.container}>
        <View style={styles.view1}>
          <Snackbar
            visible={snackbarVisible}
            onDismiss={() => setSnackbarVisible(false)}
            duration={3000}
            style={customStyles.snackbar}
          >
            {error}
          </Snackbar>
          <Image source={imagePath.logo} style={styles.imgStyle} />
          <Text style={styles.loginTextStyle}>Login</Text>
        </View>

        <View style={styles.view2}>
          <CustomizedTextInput
            label="Email Address"
            placeholder="Enter your email"
            keyboardType="email-address"
            value={email}
            onChangeText={(text) => setEmail(text)}
            inputStyle={{ marginBottom: moderateVerticalScale(28) }}
          />

          <CustomizedTextInput
            label="Password"
            placeholder="Enter your password"
            secureTextEntry={notvisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
            rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
            onPressRight={() => setNotVisible(!notvisible)}
          />

          <TouchableOpacity
            style={styles.forgotPasswordStyle}
            onPress={() => navigation.navigate(navigationStrings.FORGOTPASSWORD)}
          >
            <Text>Forgot Password?</Text>
          </TouchableOpacity>

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomizedButton btnText="Login" onPress={handleSignin} />
          )}
        </View>

        <View style={styles.bottomView}>
          <Text>Not a member?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigationStrings.SIGNUP)}
          >
            <Text>Join Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const customStyles = {
  snackbar: {
    backgroundColor: "red",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
  },
};

export default Signin;
