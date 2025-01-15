import { View, Text, ScrollView, Alert, ActivityIndicator,TouchableOpacity } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";

import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import { API_URL } from "../../../ipconfig";
import styles from "./styles";
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import color from "../../constants/color";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
 
  const [loading, setLoading] = useState(false);
  // Function to handle email submission
  const handleSubmission = async () => {
   
    if (!email) {
      Alert.alert("Error", "Please enter a valid email address");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/forgot/forgotPassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      console.log(data.message);

      if (response.ok && data.success&&data.message!==null) {
        setIsSubmit(true);
        
        navigation.navigate(navigationStrings.CODEVERIFICATION,{message:data.message,email});
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.log("Error during API call:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
    finally{
      setLoading(false);
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
        <Text style={styles.forgotTextStyle}>Forgot Password</Text>
      </View>
      <View style={styles.view2}>
        <CustomizedTextInput
          placeholder="Enter email"
          keyboardType="email-address"
          inputStyle={{ marginBottom: moderateVerticalScale(20) }}
          value={email}
          onChangeText={setEmail}
        />

{loading ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <CustomizedButton btnText="Submit" onPress={handleSubmission} />
          )}
      </View>
      <View style={styles.bottomView}>
       
      </View>
    </ScrollView>
  );
}
