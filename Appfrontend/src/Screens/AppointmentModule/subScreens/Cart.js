import { View, Text, StyleSheet, ScrollView,Button,Alert } from 'react-native';
import React from 'react';
import color from '../../../constants/color';

export default function Cart({ selectedServices, selectedStylist, selectedDate, selectedTime, nextStep }) {
    
  
  // Render service details
  const renderServices = () => {
    return Object.entries(selectedServices).map(([serviceType, serviceDetails], index) => (
      <View key={index} style={styles.serviceContainer}>
        <Text style={styles.serviceTitle}>{serviceType}</Text>
        <Text style={styles.serviceText}>Service Name: {serviceDetails.name}</Text>
        <Text style={styles.servicePrice}>Price: Rs. {serviceDetails.price}</Text>
      </View>
    ));
  };

  // Render stylist details
  const renderStylistDetails = () => {
    return (
      <View style={styles.stylistContainer}>
        <Text style={styles.sectionTitle}>Stylist Details</Text>
        <Text style={styles.stylistText}>Name: {selectedStylist.name}</Text>
        <Text style={styles.stylistText}>Experience: {selectedStylist.experience}</Text>
        <Text style={styles.stylistText}>Expertise: {selectedStylist.expertise}</Text>
        <Text style={styles.stylistAbout}>{selectedStylist.about}</Text>
      </View>
    );
  };

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.header}>Cart Summary</Text>

      {/* Render Selected Services */}
      <View style={styles.servicesWrapper}>
        <Text style={styles.sectionTitle}>Selected Services</Text>
        {renderServices()}
      </View>

      {/* Render Selected Stylist */}
      {renderStylistDetails()}

      {/* Render Selected Date and Time */}
      <View style={styles.dateTimeContainer}>
        <Text style={styles.sectionTitle}>Appointment Date & Time</Text>
        <Text style={styles.dateTimeText}>Date: {selectedDate}</Text>
        <Text style={styles.dateTimeText}>Time: {selectedTime}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Next" onPress={nextStep} color={color.background} />
      </View>
    </ScrollView>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    padding: 40,
    backgroundColor: '#f9f9f9',
    flexGrow: 1,
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 25,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 15,
    color: '#2c3e50',
  },
  serviceContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2980b9',
    marginBottom: 5,
  },
  serviceText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 16,
    color: '#27ae60',
    fontWeight: '600',
  },
  servicesWrapper: {
    marginBottom: 30,
  },
  stylistContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginBottom: 30,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  stylistText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 8,
  },
  stylistAbout: {
    fontSize: 15,
    fontStyle: 'italic',
    color: '#34495e',
  },
  dateTimeContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  dateTimeText: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  buttonContainer: {
    marginTop: 20,
    zIndex: 1,
  },
});
