import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import color from '../../constants/color';
const notifications = [
  {
    id: '1',
    title: 'New appointment',
    description: 'Booked an your appointment on 21 June 2022 at lee nails and makeover.',
    date: 'Today',
  },
  {
    id: '2',
    title: 'To remind',
    description: 'Your today\'s appointment is at 9.00AM at the big teasesalon',
    date: 'Yesterday',
  },
  {
    id: '3',
    title: 'Booking completed',
    description: 'Your booking at j.j shah salon has been completed. please share your experience.',
    date: 'Yesterday',
  },
  {
    id: '4',
    title: 'New appointment',
    description: 'Booked an your appointment on 21 June 2022 at lee nails and makeover.',
    date: '2 min ago',
  },
  {
    id: '5',
    title: 'To remind',
    description: 'Your today\'s appointment is at 9.00AM at the big teasesalon',
    date: 'Yesterday',
  },
];

export default function Notification() {
  const renderItem = ({ item }) => (
    <View style={styles.notificationContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.description}>{item.description}</Text>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
        <View style={styles.view1}>
         
          </View>  
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    
  },
  list: {
    paddingBottom: moderateVerticalScale(16),
  },
  notificationContainer: {
    backgroundColor: 'white',
    padding: moderateScale(16),
    marginVertical: moderateVerticalScale(8),
    borderRadius: moderateScale(8),
   
   
   
  },
  title: {
    fontSize: scale(16),
    fontWeight: 'bold',
    color: color.background,
    marginBottom: moderateVerticalScale(4),
  },
  description: {
    fontSize: scale(14),
    color: '#333',
    marginBottom: moderateVerticalScale(8),
  },
  date: {
    fontSize: scale(12),
    color: '#999',
  },
  view1:{
     
    
    backgroundColor:color.background,
    paddingTop:moderateScale(18),
    paddingBottom:moderateScale(18),
    backgroundColor:color.background,
    borderBottomEndRadius:moderateScale(80),
   
   
        
   
    
    
  },
});
