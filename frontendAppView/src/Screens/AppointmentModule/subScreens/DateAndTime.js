import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter'; // Import plugin
import customParseFormat from 'dayjs/plugin/customParseFormat'; // Handle custom formats
import { Calendar } from 'react-native-calendars'; 
import color from '../../../constants/color';

// Register plugins
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(isSameOrAfter);
dayjs.extend(customParseFormat); // Enable custom date/time format parsing

export default function DateAndTime({
  selectedDate,
  setSelectedDate,
  setActiveStep,
  setSelectedTime,
  setIncompleteMsg,
  selectedStylist,
  nextStep,
  selectedTime,
}) {
  const [availableDates, setAvailableDates] = useState([]);
  const [availableTimes, setAvailableTimes] = useState([]);

  const handleNextStep = () => {
    if (!selectedDate) {
      Alert.alert('Select Date');
      return;
    }
    if (!selectedTime) {
      Alert.alert('Select Time');
      return;
    }
    nextStep();
  };

  // Auto-select today's date when the component mounts
  useEffect(() => {
    const today = dayjs().format('YYYY-MM-DD');
    setSelectedDate(today);
  }, []);

  // Populate available dates from the stylist’s slots
  useEffect(() => {
    if (selectedStylist && Array.isArray(selectedStylist.dateTimeSlots)) {
      const dates = [];
      const today = dayjs().startOf('day');

      selectedStylist.dateTimeSlots.forEach((slot) => {
        const formattedDate = dayjs(slot.date, 'YYYY-MM-DD').format('YYYY-MM-DD'); // Use specific format
        console.log(`Checking date: ${formattedDate}`);

        if (dayjs(formattedDate).isSameOrAfter(today)) {
          if (!dates.includes(formattedDate)) {
            dates.push(formattedDate);
          }
        }
      });

      setAvailableDates(dates);
    }
  }, [selectedStylist]);

  // Populate available times for the selected date
  useEffect(() => {
    if (selectedDate && selectedStylist && Array.isArray(selectedStylist.dateTimeSlots)) {
      const times = [];
      const now = dayjs(); // Current time

      selectedStylist.dateTimeSlots.forEach((slot) => {
        if (dayjs(slot.date, 'YYYY-MM-DD').isSame(dayjs(selectedDate), 'day')) {
          slot.times.forEach((time) => {
            const timeInDayjs = dayjs(`${selectedDate} ${time}`, 'YYYY-MM-DD hh:mm A'); // Use custom parsing
            console.log(`Comparing: ${timeInDayjs.format()} with now: ${now.format()}`);

            if (timeInDayjs.isAfter(now)) {
              times.push(time);
            }
          });
        }
      });

      console.log('Available Times:', times);
      setAvailableTimes(times);
    }
  }, [selectedDate, selectedStylist]);

  const handleDayPress = (day) => {
    const selectedDay = dayjs(day.dateString);
    const today = dayjs().startOf('day');

    if (selectedDay.isSameOrAfter(today)) {
      setSelectedDate(day.dateString);
    }
  };

  const handleTime = (timeslot) => {
    setSelectedTime(timeslot);
    setIncompleteMsg(false);
    setActiveStep(3);
    nextStep();
  };

  const markedDates = {};

  availableDates.forEach((date) => {
    markedDates[date] = { selected: true, selectedColor: 'lightblue' };
  });

  if (selectedDate) {
    markedDates[selectedDate] = { selected: true, selectedColor: 'purple' };
  }

  return (
    <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
      <Text style={styles.heading}>Select Date And Time</Text>

      {selectedStylist && (
        <>
          <Calendar
            onDayPress={handleDayPress}
            markedDates={markedDates}
            markingType={'multi-dot'}
            style={styles.calendar}
            theme={{
              todayTextColor: 'blue',
              dayTextColor: 'black',
              selectedDayBackgroundColor: 'lightblue',
              selectedDayTextColor: 'black',
              arrowColor: 'blue',
              disabledDayTextColor: 'grey',
            }}
          />

          {availableTimes.length > 0 && (
            <View style={styles.timeSlotsContainer}>
              <Text style={styles.timeSlotsLabel}>Available Time Slots:</Text>
              <ScrollView contentContainerStyle={styles.timeSlotsList}>
                {availableTimes.map((timeSlot, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.timeSlotButton}
                    onPress={() => handleTime(timeSlot)}
                  >
                    <Text style={styles.timeSlotText}>{timeSlot}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}

          {availableTimes.length === 0 && selectedDate && (
            <Text style={styles.noTimeMessage}>No available times for this date.</Text>
          )}
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  calendar: {
    marginBottom: 20,
  },
  timeSlotsContainer: {
    marginTop: 20,
  },
  timeSlotsLabel: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  timeSlotsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  timeSlotButton: {
    backgroundColor: color.background,
    padding: 10,
    borderRadius: 5,
    margin: 5,
    width: '40%',
    alignItems: 'center',
  },
  timeSlotText: {
    color: '#fff',
    fontSize: 16,
  },
  noTimeMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: 'red',
    marginTop: 20,
  },
});
