import React, { useState, useContext, useEffect } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Alert,
  Button,
  ActivityIndicator,
} from 'react-native';
import { CardField, useConfirmPayment } from '@stripe/stripe-react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '../../../../ipconfig';
export default function PaymentMethod({
  selectedServices,
  selectedStylist,
  selectedDate,
  selectedTime,
  salonName,
  nextStep,
  salon,
}) {  
  // const { addBooking } = useContext(BookingContext); // Access BookingContext
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState(null); // Store user ID
  const [cardDetails, setCardDetails] = useState();
  const { confirmPayment, loading } = useConfirmPayment();
  const [isProcessing, setIsProcessing] = useState(false);

  // Fetch user data from AsyncStorage on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('auth');
        if (userData) {
          const parsedData = JSON.parse(userData);
          setUserId(parsedData.user._id); // Store user ID
        
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  const fetchPaymentIntentClientSecret = async () => {
    const servicesArray = Object.values(selectedServices || {});
    const amount = servicesArray.reduce(
      (total, service) => total + parseFloat(service.price || 0),
      0
    ) * 100; // Amount in cents

    const response = await fetch(
      `${API_URL}/booking/create-payment-intent`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount,
          salonName,
          selectedStylist,
          selectedDate,
          selectedTime,
          customerEmail: email,
        }),
      }
    );

    const { clientSecret, error } = await response.json();
    return { clientSecret, error };
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete || !email) {
      Alert.alert('Please enter all details');
      return;
    }

    const billingDetails = { email };

    try {
      setIsProcessing(true);
      const { clientSecret, error } = await fetchPaymentIntentClientSecret();

      if (error) {
        Alert.alert('Unable to process payment', error);
        setIsProcessing(false);
        return;
      }

      const { paymentIntent, paymentError } = await confirmPayment(clientSecret, {
        paymentMethodType: 'Card',
        billingDetails,
      });

      if (paymentError) {
        Alert.alert(`Payment Confirmation Error: ${paymentError.message}`);
      } else {
        const newBooking = {
          user_id: userId, // Use the fetched user ID
          salonName,
          salon,
          selectedServices,
          selectedStylist,
          selectedDate,
          selectedTime,
          customerEmail: email,
          paymentIntentId: paymentIntent.id,
        };

       
        await saveBookingToDB(newBooking); // Save the booking to the backend
        // await addBooking(newBooking); // Save the booking in context
        nextStep(); // Proceed to the next step
      }
    } catch (error) {
      console.error('Error:', error);
      Alert.alert('An unexpected error occurred');
    } finally {
      setIsProcessing(false);
    }
  };

  // Save the booking to the backend
  const saveBookingToDB = async (booking) => {
    try {
      const response = await axios.post(
        `${API_URL}/userBooking/add-booking`,
        booking
      );

      if (response.data.success) {
        
      } else {
        console.error('Failed to save booking to DB:', response.data.message);
        Alert.alert('Error', 'Failed to save booking in the database.');
      }
    } catch (error) {
      console.error('Error saving booking to DB:', error);
      Alert.alert('Error', 'An error occurred while saving the booking.');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="E-mail"
        keyboardType="email-address"
        onChangeText={setEmail}
        style={styles.input}
      />
      <CardField
        postalCodeEnabled
        placeholders={{ number: '4242 4242 4242 4242' }}
        onCardChange={setCardDetails}
        cardStyle={styles.card}
        style={styles.cardContainer}
      />
      {isProcessing ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <Button onPress={handlePayPress} title="Pay" disabled={loading} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20, backgroundColor: '#fff' },
  input: { height: 40, borderWidth: 1, marginBottom: 20, padding: 10 },
  cardContainer: { height: 50, marginVertical: 30 },
  card: { backgroundColor: '#f5f5f5', borderRadius: 5 },
});
