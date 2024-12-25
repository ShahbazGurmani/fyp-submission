import { 
  View, 
  Text, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  Alert, 
  BackHandler 
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import imagePath from "../../constants/imagePath";
import styles from "./styles";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import { API_URL } from "../../../ipconfig";

export default function ChangePassword({ navigation, route }) {
  const [notvisible, setNotVisible] = useState(true);
  const [notvisible1, setNotVisible1] = useState(true);
  const { email } = route.params;
  
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
    } else {
      try {
        const response = await fetch(`${API_URL}/auth/changePassword`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword, email }),
        });
  
        const data = await response.json();
  
        if (response.ok && data.success) {
          Alert.alert("Success", "Password changed successfully!");
          navigation.navigate(navigationStrings.SIGNIN);
        } else {
          Alert.alert("Error", data.message || "Failed to change password.");
        }
      } catch (error) {
        console.error("Error changing password:", error);
        Alert.alert("Error", "Unable to change password. Please try again later.");
      }
    }
  };

  // Handle Android Back Button
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        navigation.navigate(navigationStrings.SIGNIN);
        return true; // Prevent default back button behavior
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [navigation])
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.mainTextStyle}>Change Your Password</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          placeholder="Enter new password"
          secureTextEntry={notvisible}
          rightIcon={notvisible ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible(!notvisible)}
          value={newPassword}
          onChangeText={setNewPassword}
        />
        
        <CustomizedTextInput
          placeholder="Confirm your password"
          secureTextEntry={notvisible1}
          rightIcon={notvisible1 ? imagePath.hideEye : imagePath.showEye}
          onPressRight={() => setNotVisible1(!notvisible1)}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <CustomizedButton
          btnText="Change Password"
          btnStyle={{ marginTop: moderateVerticalScale(20) }}
          onPress={handleChangePassword}
        />
      </View>
    </ScrollView>
  );
}
