import { View, Text, StyleSheet,   BackHandler,TouchableOpacity } from "react-native";
import React, { useState, useEffect, useCallback } from "react";

import navigationStrings from "../../../constants/navigationStrings";
import color from "../../../constants/color";
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import { useFocusEffect } from "@react-navigation/native";


export default function Confirmation({ navigation }) {
  const handleBackPress = () => {
    
      navigation.navigate(navigationStrings.SERVICES); 
    
  };
    // Handle Android Back Button
    useFocusEffect(
      useCallback(() => {
        const onBackPress = () => {
          navigation.navigate(navigationStrings.TABROUTES);
          return true; // Prevent default back button behavior
        };
  
        BackHandler.addEventListener("hardwareBackPress", onBackPress);
  
        return () => BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      }, [navigation])
    );
  return (
   <View style={styles.container}>
     <View style={styles.header}>
    <TouchableOpacity
           onPress={handleBackPress}
            style={{
              position: "absolute",
              left: moderateScale(18),
              top: moderateVerticalScale(35),
              backgroundColor: "white",
              borderRadius: 100,
              
            }}
          >
            <ArrowLeftIcon size={30} color={color.background} />
          </TouchableOpacity>
      {/* <Text style={styles.headerText}>{salonName}</Text> */}
    </View>
    <View style={styles.bookingContainer}>
      
      <Text style={styles.heading}>Booking Confirmed!</Text>
      <Text style={styles.message}>
        Thank you for booking with us. Your appointment is confirmed.
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate(navigationStrings.TABROUTES)}>
        <Text style={styles.goHomeText}>Go to Home Page</Text>
      </TouchableOpacity>
    </View>
   </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  bookingContainer: {
    flex:0.5,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    backgroundColor: color.background,
    padding: 40,
   
    marginBottom: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginVertical: 20,
  },
  goHomeText: {
    fontSize: 16,
    color: "#007BFF",
    textDecorationLine: "underline",
  },
});
