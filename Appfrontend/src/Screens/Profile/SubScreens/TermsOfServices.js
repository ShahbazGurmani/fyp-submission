import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import color from '../../../constants/color';

export default function TermsOfService() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Terms of Service</Text>

        <Text style={styles.sectionTitle}>1. Introduction</Text>
        <Text style={styles.text}>
          Welcome to Salon Sphere! By using our app, you agree to comply with and
          be bound by these terms of service. Please read them carefully.
        </Text>

        <Text style={styles.sectionTitle}>2. User Responsibilities</Text>
        <Text style={styles.text}>
          You are responsible for providing accurate information during the
          booking process and ensuring timely attendance for appointments. Any
          misuse of the platform may result in account suspension.
        </Text>

        <Text style={styles.sectionTitle}>3. Booking and Cancellation</Text>
        <Text style={styles.text}>
          Appointments can be booked through the app. Cancellations must be made
          at least 24 hours before the scheduled appointment time to avoid
          charges.
        </Text>

        <Text style={styles.sectionTitle}>4. Payments</Text>
        <Text style={styles.text}>
          All payments are processed securely through our app. Refunds, if
          applicable, will be subject to our refund policy.
        </Text>

        <Text style={styles.sectionTitle}>5. Privacy</Text>
        <Text style={styles.text}>
          Your personal information is handled in accordance with our Privacy
          Policy. We prioritize the security and confidentiality of your data.
        </Text>

        <Text style={styles.sectionTitle}>6. Amendments</Text>
        <Text style={styles.text}>
          We reserve the right to update these terms of service at any time.
          Changes will be communicated through the app.
        </Text>

        <Text style={styles.sectionTitle}>7. Contact Us</Text>
        <Text style={styles.text}>
          If you have any questions about these terms, please contact us at
          support@salonsphere.com.
        </Text>

        <Text style={styles.footer}>Thank you for choosing Salon Sphere!</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  contentContainer: {
    padding: moderateScale(16),
  },
  title: {
    fontSize: scale(24),
    fontWeight: 'bold',
    color: color.background,
    textAlign: 'center',
    marginBottom: moderateVerticalScale(16),
  },
  sectionTitle: {
    fontSize: scale(18),
    fontWeight: 'bold',
    color: '#333',
    marginTop: moderateVerticalScale(16),
    marginBottom: moderateVerticalScale(8),
  },
  text: {
    fontSize: scale(14),
    color: '#555',
    lineHeight: scale(20),
  },
  footer: {
    fontSize: scale(14),
    color: '#999',
    textAlign: 'center',
    marginTop: moderateVerticalScale(16),
  },
});
