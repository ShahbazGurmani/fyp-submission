import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import styles from "./Styles";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function MyAccount() {
  const [modalVisible, setModalVisible] = useState(false);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [isEditable, setIsEditable] = useState(false); // Track edit mode

  // Fetch user data from AsyncStorage
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.user.first_name);
          setUserEmail(parsedData.user.email);
          setUserPhoneNumber(parsedData.user.phone_number);
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Save updated user data to AsyncStorage
  const handleUpdate = async () => {
    try {
      const updatedUser = {
        first_name: userName,
        email: userEmail,
        phone_number: userPhoneNumber,
      };

      const authData = await AsyncStorage.getItem('auth');
      const parsedData = JSON.parse(authData);
      parsedData.user = { ...parsedData.user, ...updatedUser };

      await AsyncStorage.setItem('auth', JSON.stringify(parsedData));
      Alert.alert('Success', 'Profile updated successfully!');
      setIsEditable(false); // Exit edit mode
    } catch (error) {
      console.log('Error updating user data:', error);
      Alert.alert('Error', 'Failed to update profile.');
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.view1}>
        <View style={styles.profileImageContainer}>
          <View style={styles.profileImageWrapper}>
            <Image
              source={require("../../../../assets/images/sk.png")}
              style={styles.profileImage}
            />
          </View>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => setModalVisible(true)}
          >
            <Icon name="camera" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.additionalTextContainer}>
        <Text style={styles.additionalText}>Full Name</Text>
        <View style={styles.additionalTextSubContainer}>
          <TextInput
            style={styles.additionalSubText}
            value={userName}
            editable={isEditable} // Editable only when edit mode is active
            onChangeText={setUserName}
            placeholder="Enter your name"
          />
        </View>
      </View>

      <View style={styles.additional2ndTextContainer}>
        <Text style={styles.additionalText}>Email Id</Text>
        <View style={styles.additionalTextSubContainer}>
          <TextInput
            style={styles.additionalSubText}
            value={userEmail}
            editable={false} // Email is always read-only
          />
        </View>
      </View>

      <View style={styles.additional3rdTextContainer}>
        <Text style={styles.additionalText}>Phone Number</Text>
        <View style={styles.additionalTextSubContainer}>
          <TextInput
            style={styles.additionalSubText}
            value={userPhoneNumber}
            editable={isEditable} // Editable only when edit mode is active
            onChangeText={setUserPhoneNumber}
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
          />
        </View>
      </View>

      {!isEditable ? (
        <TouchableOpacity
          style={styles.bigButton}
          onPress={() => setIsEditable(true)} // Enable edit mode
        >
          <Text style={styles.bigButtonText}>Edit</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.bigButton} onPress={handleUpdate}>
          <Text style={styles.bigButtonText}>Update</Text>
        </TouchableOpacity>
      )}

      <Modal visible={modalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <TouchableOpacity
            onPress={() => setModalVisible(false)}
            style={styles.modalCloseButton}
          >
            <Icon name="close" size={30} color="#000" />
          </TouchableOpacity>
          <Text style={styles.modalText}>Profile Image Upload Coming Soon!</Text>
        </View>
      </Modal>
    </ScrollView>
  );
}
