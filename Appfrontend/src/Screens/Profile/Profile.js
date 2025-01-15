import React, { useContext ,useState,useEffect} from "react";
import {
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Icon from "react-native-vector-icons/FontAwesome";
import navigationStrings from "../../constants/navigationStrings";
import styles from "./styles"; // Import styles as default

export default function Profile({ navigation,setLogin,onSignIn,login }) {
  // Logout function to clear AsyncStorage and navigate to login screen
  const handleLogout = async () => {
    Alert.alert(
      "Confirm Logout", // Title
      "Are you sure you want to log out?", // Message
      [
        {
          text: "Cancel", // Cancel button
          onPress: () => console.log("Logout canceled"), // Remain on Profile
          style: "cancel", // Default cancel style
        },
        {
          text: "Yes", // Confirm button
          onPress: async () => {
            try {
              await AsyncStorage.removeItem("auth"); // Clear authentication data
  
              setLogin(false); // Update login state to false
  
              setTimeout(() => {
                navigation.reset({
                  index: 0,
                  routes: [{ name: navigationStrings.SIGNIN }],
                });
              }, 100); // Small delay to ensure proper state propagation
            } catch (error) {
              console.log("Error logging out:", error);
            }
          },
        },
      ],
      { cancelable: true } // Allows user to dismiss the alert by tapping outside
    );
  };
  
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserName(parsedData.user.first_name);
          setUserEmail(parsedData.user.email);
         
          
        }
      } catch (error) {
        console.log('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.view1}>
          <View>
            <Text style={styles.textHeading}>Profile</Text>
          </View>

          <View style={styles.profileImageContainer}>
            {/* <View style={styles.profileImageWrapper}>
              <Image
                source={require("../../assets/images/sk.png")}
                style={styles.profileImage}
              />
            </View> */}
            <View style={styles.profileTextView}>
              <Text style={styles.profileTextName}>{userName}</Text>
              <Text style={styles.profileTextEmail}>{userEmail}</Text>
            </View>
          </View>
        </View>

        <View style={styles.additionalTextContainer}>
          <TouchableOpacity
            style={styles.additionalTextView}
            onPress={() => navigation.navigate(navigationStrings.MYACCONT)}
          >
            <Icon name="user" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>My Account</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Chat clicked")}
          >
            <Icon name="comment" size={25} style={styles.ChatIcon} />
            <Text style={styles.additionalText}>Chat</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity> */}
        </View>

        <View style={styles.additionalText2ndContainer}>
          <TouchableOpacity
            style={styles.additionalTextView}
            onPress={() => navigation.navigate(navigationStrings.FAVOURITES)}
          >
            <Icon name="heart-o" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Favorite</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Language clicked")}
          >
            <Icon name="language" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Language</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity> */}

          {/* <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Notification Setting")}
          >
            <Icon name="bell-o" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Notification Setting</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Invite Friends clicked")}
          >
            <Icon name="user-plus" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Invite Friends</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>

          {/* <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Your Coupon clicked")}
          >
            <Icon name="ticket" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Your Coupon</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity> */}

          <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => navigation.navigate(navigationStrings.TERMSOFSERVICES)}
          >
            <Icon name="file-text-o" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Terms Of Services</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.additionalButton}
            onPress={() => console.log("Help And Support clicked")}
          >
            <Icon name="question-circle-o" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Help And Support</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>

          {/* Logout Button */}
          <TouchableOpacity style={styles.additionalButton} onPress={handleLogout}>
            <Icon name="sign-out" size={25} style={styles.ProfileIcon} />
            <Text style={styles.additionalText}>Logout</Text>
            <Icon name="chevron-right" size={20} color="#000" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
