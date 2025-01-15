import React, { useState } from "react";
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
import CustomizedTextInput from "../../components/CustomizedTextInput";
import CustomizedButton from "../../components/CustomizedButton";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import navigationStrings from "../../constants/navigationStrings";
import { API_URL } from "../../../ipconfig";
export default function Signup({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); 
  const [notVisible, setNotVisible] = useState(true);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !phoneNumber || !password) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post(
        `${API_URL}/auth/register`,
        {
          first_name: firstName,
          last_name: lastName,
          email,
          phone_number: phoneNumber,
          password,
        }
      );

      if (response.status === 201) {
        Alert.alert("Success", "User registered successfully!");

        await AsyncStorage.setItem("auth", JSON.stringify(response.data.user));
        navigation.replace(navigationStrings.SIGNIN);
      } else {
        Alert.alert("Error", response.data.message || "Registration failed.");
      }
    } catch (error) {
      console.log("Registration Error:", error);
      Alert.alert("Error", error.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <View style={styles.view1}>
          <Image source={imagePath.logo} style={styles.imgStyle} />
          <Text style={styles.signupTextStyle}>Register</Text>
        </View>

        <View style={styles.view2}>
          <CustomizedTextInput
            placeholder="Enter First Name"
            value={firstName}
            onChangeText={setFirstName}
            inputStyle={{ marginBottom: moderateVerticalScale(1) }}
          />
          <CustomizedTextInput
            placeholder="Enter Last Name"
            value={lastName}
            onChangeText={setLastName}
            inputStyle={{ marginBottom: moderateVerticalScale(1) }}
          />
          <CustomizedTextInput
            placeholder="Enter Email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            inputStyle={{ marginBottom: moderateVerticalScale(1) }}
          />
          <CustomizedTextInput
            placeholder="Enter Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="numeric"
            inputStyle={{ marginBottom: moderateVerticalScale(1) }}
          />
          <CustomizedTextInput
            placeholder="Enter Password"
            value={password}
            secureTextEntry={notVisible}
            onChangeText={setPassword}
            rightIcon={notVisible ? imagePath.hideEye : imagePath.showEye}
            onPressRight={() => setNotVisible(!notVisible)}
            inputStyle={{ marginBottom: moderateVerticalScale(12) }}
          />

          {loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomizedButton btnText="Signup" onPress={handleSignup} />
          )}
        </View>

        <View style={styles.bottomView}>
          <Text>Already a member?</Text>
          <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.SIGNIN)}>
            <Text>Signin</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
