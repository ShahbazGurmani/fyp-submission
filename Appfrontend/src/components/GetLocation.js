import { moderateScale } from 'react-native-size-matters';
import color from '../constants/color';
import { MapPinIcon} from "react-native-heroicons/outline";
import { userLocation } from './UserLocation';
import React, { useState, useEffect } from 'react';
import { Platform, Text, View, StyleSheet,Image,} from 'react-native';

export default function GetLocation({permissionStatus,setPermissionStatus,location,setLocation,address,setAddress}) {

  const [errorMsg, setErrorMsg] = useState(null);




  useEffect(() => {
    const getLocation = async () => {
      try {
        const { location, address, permissionStatus1 } = await userLocation();
        setPermissionStatus(permissionStatus1);
        
        if (permissionStatus1 === 'granted') {
          setLocation(location);
          setAddress(`${address[0].name}, ${address[0].city}`);
       
        }
      } catch (error) {
        console.log(error);
      }
    };

    getLocation();
  }, []);
  let text = 'Waiting...';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = address;
  }

  return (
    <View style={{ flexDirection: 'row', paddingVertical: moderateScale(6),width:'90%' }}>
      <MapPinIcon size={20} color="white" />
      <Text style={styles.paragraph}>{text}</Text>
    </View>
  );
}
const styles = StyleSheet.create({
 
  paragraph: {
   
  
    color:'white',
    
     
    
    
  },
});