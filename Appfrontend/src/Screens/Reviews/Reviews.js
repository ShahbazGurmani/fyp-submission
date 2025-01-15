import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import StarIcon from 'react-native-vector-icons/Ionicons';
import color from '../../constants/color';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { XMarkIcon } from 'react-native-heroicons/outline';
import { useNavigation, useRoute } from "@react-navigation/native";
import { API_URL } from '../../../ipconfig';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Reviews = () => {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const route = useRoute();
  const { salon1 } = route.params || {}; // `salon1` contains the salon ID
  const navigation = useNavigation();
    console.log(salon1._id);
  
  const handleRating = (value) => {
    setRating(value);
  };

  const handleSubmit = async () => {
    if (rating === 0 || review.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and a review.');
      return;
    }
  
    try {
      const userData = await AsyncStorage.getItem('auth'); // Fetch token from storage
      const parsedData = userData ? JSON.parse(userData) : null;
  
      if (!parsedData || !parsedData.token) {
        Alert.alert('Error', 'User is not authenticated.');
        return;
      }
  
      const response = await fetch(`${API_URL}/salon/${salon1._id}/review`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${parsedData.token}`, // Include the token here
        },
        body: JSON.stringify({
          comment: review,
          rating: rating,
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        Alert.alert('Thank you!', 'Your review has been submitted.');
        setRating(0);
        setReview('');
        navigation.goBack(); // Navigate back after submission
      } else {
        Alert.alert( data.message || 'Failed to submit the review.');
        console.log(data);
      }
    } catch (error) {
      console.log('Error submitting review:', error);
      Alert.alert('Error', 'Something went wrong. Please try again.');
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: color.background,
        paddingVertical: moderateVerticalScale(30),
        borderBottomEndRadius: moderateScale(8),
        height: 100
      }}>
        <TouchableOpacity style={{ marginLeft: 10 }} onPress={navigation.goBack}>
          <XMarkIcon color="white" size={28} />
        </TouchableOpacity>
        <Text style={{ color: 'white', fontSize: scale(17), marginLeft: 100 }}>Your Review</Text>
      </View>

      <View style={styles.starsContainer}>
        {[1, 2, 3, 4,5].map((star) => (
          <TouchableOpacity key={star} onPress={() => handleRating(star)}>
            <StarIcon
              name={star <= rating ? 'star' : 'star-outline'}
              size={32}
              color={star <= rating ? '#FF007F' : '#CCCCCC'}
              style={styles.starIcon}
            />
          </TouchableOpacity>
        ))}
      </View>

      <TextInput
        style={styles.input}
        placeholder="Say something"
        value={review}
        onChangeText={setReview}
        multiline
      />

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },
  starsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: 20
  },
  starIcon: {
    marginHorizontal: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    height: 80,
    textAlignVertical: 'top',
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: color.background,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default Reviews;
