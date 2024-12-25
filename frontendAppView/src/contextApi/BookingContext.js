// import React, { createContext, useState, useEffect, useCallback } from 'react';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import dayjs from 'dayjs';
// import utc from 'dayjs/plugin/utc';
// import timezone from 'dayjs/plugin/timezone';
// import isSameOrBefore from 'dayjs/plugin/isSameOrBefore'; // Ensure plugin is imported

// // Extend Day.js with plugins
// dayjs.extend(utc);
// dayjs.extend(timezone);
// dayjs.extend(isSameOrBefore);

// export const BookingContext = createContext();

// export const BookingProvider = ({ children }) => {
//   const [bookings, setBookings] = useState({ ongoing: [], history: [] });
//   const [loading, setLoading] = useState(true); // Ensure loading until bookings are fetched

//   // Load bookings when the provider mounts
//   useEffect(() => {
//     loadAndCategorizeBookings();
//   }, []);

//   // Load bookings from AsyncStorage and categorize them
//   const loadAndCategorizeBookings = async () => {
//     try {
//       const storedBookings = await AsyncStorage.getItem('bookings');
//       console.log('Loaded bookings from storage:', storedBookings);

//       const parsedBookings = storedBookings
//         ? JSON.parse(storedBookings)
//         : { ongoing: [], history: [] };

//       // Categorize the bookings before setting the state
//       const categorizedBookings = categorizeBookings(parsedBookings);
//       setBookings(categorizedBookings);

//       // Save the updated bookings back to AsyncStorage
//       await AsyncStorage.setItem('bookings', JSON.stringify(categorizedBookings));
//       console.log('Bookings updated in storage:', categorizedBookings);
//     } catch (error) {
//       console.error('Error loading or categorizing bookings:', error);
//     } finally {
//       setLoading(false); // Ensure loading state is turned off
//     }
//   };

//   // Categorize bookings into ongoing and history using Day.js
//   const categorizeBookings = useCallback((data) => {
//     const now = dayjs(); // Current time in the local timezone

//     const ongoing = data.ongoing.filter((booking) => {
//       const bookingTime = dayjs(`${booking.selectedDate} ${booking.selectedTime}`, 'YYYY-MM-DD hh:mm A');
     
//       return bookingTime.isAfter(now); // Keep only future bookings in ongoing
//     });

//     const history = [
//       ...data.history,
//       ...data.ongoing.filter((booking) => {
//         const bookingTime = dayjs(`${booking.selectedDate} ${booking.selectedTime}`, 'YYYY-MM-DD hh:mm A');
       
//         return bookingTime.isSameOrBefore(now); // Move past bookings to history
//       }),
//     ];

//     return { ongoing, history }; // Return the categorized bookings
//   }, []);

//   // Add a new booking and save it to both state and AsyncStorage
//   const addBooking = async (newBooking) => {
//     setBookings((prevBookings) => {
//       const updatedBookings = {
//         ongoing: [...prevBookings.ongoing, newBooking],
//         history: prevBookings.history,
//       };
  
//       // Save the updated bookings to AsyncStorage
//       AsyncStorage.setItem('bookings', JSON.stringify(updatedBookings))
//         .then(() => console.log('Booking added and saved:', updatedBookings))
//         .catch((error) => console.error('Error saving new booking:', error));
  
//       return updatedBookings;
//     });
//   };
  

//   if (loading) {
//     return null; // Prevent rendering until data is loaded
//   }

//   return (
//     <BookingContext.Provider value={{ bookings, addBooking }}>
//       {children}
//     </BookingContext.Provider>
//   );
// };