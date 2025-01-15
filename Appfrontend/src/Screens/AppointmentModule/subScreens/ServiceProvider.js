import React, { useState } from 'react';
import { View, Text, FlatList, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity, Button, Alert } from 'react-native';
import imagePath from '../../../constants/imagePath';
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters';
import color from '../../../constants/color';

const { width } = Dimensions.get('window');

export default function ServiceProvider({ stylists, onNextStep, setSelectedStylist, selectedStylist }) {

  const handleStylistSelect = (stylist) => {
    setSelectedStylist(stylist);
   
  };
  const handleNextStep = () => {
   
    
    // Check if selectedStylist is empty
    if (!selectedStylist || Object.keys(selectedStylist).length === 0) {
      Alert.alert(
        'Select Stylist',
        'Please select a stylist to proceed.',
        [{ text: 'OK' }]
      );
    } else {
      onNextStep(selectedStylist);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Select a Service Provider</Text>

      {stylists.length > 0 ? (
        <FlatList
          data={stylists}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.card, selectedStylist?._id === item._id ? styles.selectedCard : null]}
              onPress={() => handleStylistSelect(item)}
            >
              <Image style={styles.image} source={imagePath.hairsalon} />
              <Text style={styles.stylistName}>{item.name}</Text>
              <Text style={styles.stylistDetail}>Experience: {item.experience}</Text>
              <Text style={styles.stylistDetail}>Expertise: {item.expertise}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item._id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.flatListContent}
        />
      ) : (
        <Text style={styles.noServiceText}>No stylists available</Text>
      )}

      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={handleNextStep} color={color.background} />
      </View>

      <View style={styles.bottomSpace} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f8f9fa',
    flexGrow: 1,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
    color: '#333',
  },
  card: {
    borderWidth: 1,
    borderColor: '#dedede',
    borderRadius: 8,
    padding: 25,
    margin: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
    elevation: 3,
    width: (width / 2) - 20,
  },
  selectedCard: {
    borderColor: color.background, // Updated to use color.background
    borderWidth: 2,
  },
  image: {
    height: moderateVerticalScale(100),
    width: moderateScale(100),
    marginBottom: 10,
  },
  stylistName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.background, // Updated to use color.background
    marginBottom: 8,
  },
  stylistDetail: {
    fontSize: 14,
    color: '#555',
    marginVertical: 2,
    textAlign: 'center',
  },
  noServiceText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
  flatListContent: {
    paddingBottom: 20,
  },
  buttonContainer: {
    marginTop: 20,
    zIndex: 1,
  },
  bottomSpace: {
    height: 220,
  },
});
