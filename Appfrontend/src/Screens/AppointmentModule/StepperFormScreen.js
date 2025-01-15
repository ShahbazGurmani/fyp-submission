import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, Alert } from 'react-native';
import StepIndicator from 'react-native-step-indicator';
import ServiceProvider from './subScreens/ServiceProvider';
import DateAndTime from './subScreens/DateAndTime';
import Cart from './subScreens/Cart';
import color from '../../constants/color';
import { ArrowLeftIcon } from 'react-native-heroicons/outline';
import { scale, verticalScale, moderateScale, moderateVerticalScale } from "react-native-size-matters";
import navigationStrings from '../../constants/navigationStrings';
import PaymentMethod from './subScreens/PaymentMethod';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";

const StepperFormScreen = ({ route, navigation }) => {
  const [currentPosition, setCurrentPosition] = useState(1);
  const { selectedServices, stylists, salonName,salonId,salon } = route.params;
  const [selectedStylist, setSelectedStylist] = useState({});
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedAgent, setSelectedAgent] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const [incompleteMsg, setIncompleteMsg] = useState(false);


  

  const steps = ['Service', 'Service Provider', 'Date & Time', 'Cart', 'Payment'];


  // Handle back button press
  const handleBackPress = () => {
    if (currentPosition > 1) {
      setCurrentPosition((prevPosition) => prevPosition - 1); // Move to the previous step
    } else {
      navigation.navigate(navigationStrings.SERVICES); // Navigate back to the Service component
    }
  };

  // React.useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerLeft: () => (
  //       <TouchableOpacity onPress={handleBackPress}>
  //         <ArrowLeftIcon fill={'black'} size={84} color="white" />
  //       </TouchableOpacity>
  //     ),
  //   });
  // }, [navigation, currentPosition]);

  const nextStep = () => {
    if (currentPosition < steps.length - 1) {
      setCurrentPosition(currentPosition + 1);
    }
    else if(currentPosition==4){
      navigation.navigate(navigationStrings.CONFIRMATION)

    }
  };

  const prevStep = () => {
    if (currentPosition > 0) {
      setCurrentPosition(currentPosition - 1);
    }
  };

  const handleConfirmation = () => {
   
    navigation.navigate('BookingSuccess');
  };

  const handleNextStep = (stylists) => {
    setSelectedStylist(stylists);
    nextStep();
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* Header with salon name */}
      <View style={styles.header}>
      <TouchableOpacity
             onPress={handleBackPress}
              style={{
                position: "absolute",
                left: wp(7),
                top:hp(5),
                backgroundColor: "white",
                borderRadius: 100,
                
              }}
            >
              <ArrowLeftIcon size={30} color={color.background} />
            </TouchableOpacity>
        <Text style={styles.headerText}>{salonName}</Text>
      </View>

      {/* Step Indicator */}
      <View style={{ margin: 5 }}>
        <StepIndicator
          currentPosition={currentPosition}
          labels={steps}
          stepCount={steps.length}
          customStyles={stepIndicatorStyles}
        />
      </View>

      {/* Render different content based on the current step */}
      <View style={styles.contentContainer}>
        {currentPosition === 1 && (
          <View>
            <ServiceProvider
              selectedServices={selectedServices}
              onNextStep={handleNextStep}
              stylists={stylists}
              setSelectedStylist={setSelectedStylist}
              selectedStylist={selectedStylist}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={nextStep}>
                <Text style={styles.buttonText}>NEXT</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {currentPosition === 2 && (
          <View>
            <DateAndTime
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
              setActiveStep={setActiveStep}
              selectedAgent={selectedAgent}
              setSelectedTime={setSelectedTime}
              setIncompleteMsg={setIncompleteMsg}
              selectedServices={selectedServices}
              selectedStylist={selectedStylist}
              selectedTime={selectedTime}
              nextStep = {nextStep}
            />
          </View>
        )}

        {currentPosition === 3 && (
          <View>
            <Text style={styles.stepText}>Cart Summary</Text>
              <Cart selectedServices = {selectedServices} selectedStylist = {selectedStylist} 
              selectedDate = {selectedDate} selectedTime = {selectedTime} nextStep={nextStep}/>
           
          </View>
        )}

        {currentPosition === 4 && (
          <View>
            <Text style={styles.stepText}>Payment Method</Text>
           <PaymentMethod  selectedServices = {selectedServices} selectedStylist = {selectedStylist} 
              selectedDate = {selectedDate} 
              selectedTime = {selectedTime} 
              salonId={salonId} salonName={salonName} nextStep={nextStep} salon={salon}/>
           
          </View>
        )}

        {currentPosition === 5 && (
          <View>
            <Text style={styles.stepText}>Confirmation</Text>
            {/* Show Confirmation UI */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.backButton} onPress={prevStep}>
                <Text style={styles.buttonText}>BACK</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

// Styles for step indicator and buttons
const stepIndicatorStyles = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  currentStepIndicatorStyle: {
    backgroundColor: color.background,
    borderColor: color.background,
    borderWidth: 2,
  },
  stepIndicatorFinishedColor: color.background,
  stepIndicatorUnFinishedColor: '#E0E0E0',
  separatorFinishedColor: color.background,
  separatorUnFinishedColor: '#E0E0E0',
  labelColor: '#757575',
  finishedLabelColor: 'black',
  currentStepLabelColor: color.background,
  labelFontSize: 16,
  currentStepIndicatorLabelFontSize: 16,
  stepIndicatorLabelFontSize: 14,
  stepStrokeWidth: 0,
  currentStepStrokeWidth: 2,
  currentStepStrokeColor: '#E0E0E0',
  stepStrokeFinishedColor: color.background,
  stepStrokeUnFinishedColor: '#E0E0E0',
  stepStrokeCurrentColor: color.background,
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: color.background,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20,
  },
  button: {
    backgroundColor: color.background,
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  backButton: {
    backgroundColor: '#757575',
    padding: 15,
    borderRadius: 5,
    flex: 0.45,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#424242',
    textAlign: 'center',
    marginBottom: 20,
  },
});

export default StepperFormScreen;
