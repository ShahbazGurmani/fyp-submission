import React, { useState, useRef } from "react";
import { View, TextInput, Text, StyleSheet, TouchableOpacity } from "react-native";

const CustomizedOtpInput = ({ length = 4, onChange, value }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  const handleChange = (text, index) => {
    // Only allow single character input
    if (text.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = text;
      setOtp(newOtp);
      onChange(newOtp.join(""));

      // Move focus to the next input field
      if (text && index < length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleBackspace = (index) => {
    if (otp[index] === "") {
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    } else {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      onChange(newOtp.join(""));
    }
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <View key={index} style={styles.inputWrapper}>
          <TextInput
            ref={(ref) => (inputRefs.current[index] = ref)}
            style={styles.input}
            maxLength={1}
            keyboardType="numeric"
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
            onKeyPress={({ nativeEvent }) =>
              nativeEvent.key === "Backspace" && handleBackspace(index)
            }
            autoFocus={index === 0}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputWrapper: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  input: {
    width: 40,
    height: 40,
    textAlign: "center",
    fontSize: 20,
  },
});

export default CustomizedOtpInput;
