import { View, Text, ScrollView, Alert, ActivityIndicator, } from "react-native";
import React, { useState } from "react";
import CustomizedTextInput from "../../components/CustomizedTextInput";
import { moderateVerticalScale } from "react-native-size-matters";
import CustomizedButton from "../../components/CustomizedButton";
import navigationStrings from "../../constants/navigationStrings";
import { API_URL } from "../../../ipconfig";
import styles from "./styles";

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);
  const [message,setMessage] = useState('');
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
      setMessage(data.message)

      if (response.ok && data.success) {
        setIsSubmit(true);
        navigation.navigate(navigationStrings.CODEVERIFICATION,{message,email});
      } else {
        Alert.alert("Error", data.message || "Something went wrong");
      }
    } catch (error) {
      console.error("Error during API call:", error);
      Alert.alert("Error", "Failed to connect to the server");
    }
    finally{
      setLoading(false);
    }
  };

  return (
    <ScrollView>
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
