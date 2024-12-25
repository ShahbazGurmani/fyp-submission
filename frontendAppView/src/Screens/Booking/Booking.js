import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Linking,
  Alert,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import styles from './styles';
import navigationStrings from '../../constants/navigationStrings';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import dayjs from 'dayjs'; // Import dayjs for date and time comparisons
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Import the plugin

// Extend dayjs with necessary plugins
dayjs.extend(isSameOrBefore);
import { API_URL } from '../../../ipconfig';
export default function Booking() {
  const [activeTab, setActiveTab] = useState('ongoing'); // Manage active tab
  const [email, setEmail] = useState('');
  const [ongoingBookings, setOngoingBookings] = useState([]);
  const [historyBookings, setHistoryBookings] = useState([]);
  const navigation = useNavigation(); // Navigation hook

  // Fetch user email
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setEmail(parsedData.user.email); // Set email state
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch bookings
  useEffect(() => {
    if (email) {
      const fetchBookings = async () => {
        try {
          const response = await axios.get(
            `${API_URL}/userBooking/user-bookings?email=${email}`
          );
          if (response.data.success) {
            categorizeBookings(response.data.bookings); // Categorize bookings
            
          } else {
            console.log('No bookings found for this user.');
          }
        } catch (error) {
          console.error('Error fetching bookings:', error);
          Alert.alert('Error', 'Unable to fetch bookings');
        }
      };
      fetchBookings();
    }
  }, [email]);

  // Categorize bookings into ongoing and history
  const categorizeBookings = (bookings) => {
    const now = dayjs(); // Get the current date and time

    const ongoing = bookings.filter((booking) =>
      dayjs(`${booking.selectedDate} ${booking.selectedTime}`, 'YYYY-MM-DD hh:mm A').isAfter(now)
    );

    const history = bookings.filter((booking) =>
      dayjs(`${booking.selectedDate} ${booking.selectedTime}`, 'YYYY-MM-DD hh:mm A').isSameOrBefore(now)
    );

    setOngoingBookings(ongoing); // Set ongoing bookings
    setHistoryBookings(history); // Set history bookings
  };

  const handleTabPress = (tab) => setActiveTab(tab); // Handle tab switch

  const navigateToSalon = (item) => {
    navigation.navigate(navigationStrings.SHOP, { item });
  };
  const navigateToReview = (item) => {
    navigation.navigate(navigationStrings.REVIEWS, { salon1:item });
  };

  const GetDirectionPress = (item) => {
    const { location } = item.salon;
    const url = `https://www.google.com/maps/dir/?api=1&destination=${location.latitude},${location.longitude}`;
    Linking.openURL(url).catch((err) =>
      console.error('Error opening Google Maps:', err)
    );
  };

  const renderBookingItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToSalon(item.salon)}>
      <View style={styles.itemContainer}>
        <View style={styles.imageContainer}>
          <Image
            source={item.image || require('../../assets/images/nailsalon.png')}
            style={styles.image}
          />
        </View>
        <View style={styles.textView}>
          <Text style={styles.itemTextName}>{item.salonName}</Text>
          <View style={styles.locationContainer}>
            <Icon name="map-marker" size={20} color="grey" style={styles.locationIcon} />
            <Text style={styles.LocationitemText}>
              {item.selectedStylist?.name || 'No stylist'}
            </Text>
          </View>
          <Text style={styles.itemTextAppointment}>
            {item.selectedDate} at {item.selectedTime}
          </Text>

          {activeTab === 'ongoing' && (
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.button} onPress={() => GetDirectionPress(item)}>
                <Text style={styles.buttonTextD}>Get Direction</Text>
              </TouchableOpacity>
              <View style={styles.butttonSpace}>
                <TouchableOpacity style={styles.button}>
                  <Text
                    style={styles.buttonTextC}
                    onPress={() => navigateToSalon(item.salon)}
                  >
                    Cancel
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          {activeTab === 'history' && (
            <View style={styles.buttonView}>
              <TouchableOpacity style={styles.feedBackButton}  onPress={() => navigateToReview(item.salon)} >
                <Text style={styles.buttonTextD}>Give Feedback</Text>
              </TouchableOpacity>
             
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.view1}>
        <Text style={styles.textHeading}>Booking</Text>
        <Text style={styles.textSubheading}>See Your Upcoming Booking</Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'ongoing' && styles.activeTabButton]}
            onPress={() => handleTabPress('ongoing')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'ongoing' && styles.activeTabButtonText,
              ]}
            >
              Ongoing
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tabButton, activeTab === 'history' && styles.activeTabButton]}
            onPress={() => handleTabPress('history')}
          >
            <Text
              style={[
                styles.tabButtonText,
                activeTab === 'history' && styles.activeTabButtonText,
              ]}
            >
              History
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        style={[styles.contentContainer, { height: 600 }]}
        data={activeTab === 'ongoing' ? ongoingBookings : historyBookings}
        keyExtractor={(item) => item.paymentIntentId}
        renderItem={renderBookingItem}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>
              No {activeTab === 'ongoing' ? 'ongoing' : 'history'} bookings available.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
