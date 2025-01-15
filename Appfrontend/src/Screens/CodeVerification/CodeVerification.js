import { View, Text, TouchableOpacity, ScrollView, Alert } from "react-native";
import React, { useState } from "react";
import CustomizedButton from "../../components/CustomizedButton";
import { OtpInput } from "react-native-otp-entry";
import styles from "./styles";
import { moderateVerticalScale, moderateScale } from "react-native-size-matters";
import { API_URL } from "../../../ipconfig";
import navigationStrings from "../../constants/navigationStrings";
import CustomizedOtpInput from "../../components/customizedOtpInput";
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import color from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export default function CodeVerification({ navigation, route }) {
  const [otp, setOtp] = useState("");
  const [isResending, setIsResending] = useState(false);
  const { email, message } = route.params;
  // const [message, setMessage] = useState();
  
 
 
  // Function to handle OTP submission
  const handleSubmit = async () => {
    console.log("Entered OTP:", otp); // Log OTP to verify it's being updated correctly
    if (!otp) {
      Alert.alert("Error", "Please enter the OTP");
      return;
    }

    try {
      const response = await fetch(`${API_URL}/forgot/verifyOtp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      const data = await response.json();
      console.log(data);

      if (response.ok && data.success) {
        // OTP is verified successfully, navigate to change password screen
        navigation.navigate(navigationStrings.CHANGEPASSWORD,{email});
      } else {
        // OTP verification failed
        Alert.alert("Error", data.message || "Invalid OTP");
      }
    } catch (error) {
      console.log("Error during OTP verification:", error);
      Alert.alert("Error", "Unable to connect to the server");
    }
  };

  // Function to handle OTP resend
  const handleResendCode = async () => {
    setIsResending(true);
    try {
      const response = await fetch(`${API_URL}/forgot/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        Alert.alert("Success", "A new OTP has been sent to your email");
        setMessage("A new OTP has been sent to your email");
      } else {
        Alert.alert("Error", data.message || "Failed to resend the OTP");
      }
    } catch (error) {
      console.log("Error during OTP resend:", error);
      Alert.alert("Error", "Unable to connect to the server");
    } finally {
      setIsResending(false);
    }
  };

  return (
    <ScrollView>
       <TouchableOpacity
           onPress={navigation.goBack}
         style={{
                    left: wp(6),
                                  top: hp(6),
                    
                    borderRadius: wp(10),
                  }}
        >
          <ArrowLeftIcon size={30} color={color.background} />
        </TouchableOpacity>
      <View style={styles.view1}>
        <Text style={styles.verifyTextStyle}>Verify OTP</Text>
      </View>
      <View style={styles.view2}>
          <CustomizedOtpInput value={otp} onChange={setOtp} length={4}/>
        <CustomizedButton
          btnText="Submit"
          btnStyle={{ marginTop: moderateVerticalScale(40) }}
          onPress={handleSubmit}  // Submit the OTP for verification
        />
      </View>

      <View style={styles.bottomView}>
        <Text style={{ color: "red", marginBottom: 10 }}>{message}</Text>

        <TouchableOpacity onPress={handleResendCode} disabled={isResending}>
          <Text style={{ color: isResending ? "gray" : "blue" }}>
            Didn't receive the code? Resend
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
