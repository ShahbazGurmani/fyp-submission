import { View, Text, SafeAreaView } from 'react-native'
import React from 'react'
import color from '../../constants/color';
import SearchBar from '../../components/SearchBar'
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import * as Location from 'expo-location';
import MapView, { Marker,Callout } from 'react-native-maps';
import Map from '../../components/Map';

export default function NearBy({allSalons,permissionStatus,setPermissionStatus,location

  ,setLocation,address,setAddress
}) {
  
  return (
    <SafeAreaView style={{flex:1}}>
     
    <View style={{
       justifyContent:'center',
       backgroundColor:color.background,
       paddingVertical:moderateVerticalScale(40),
       borderBottomEndRadius:moderateScale(80),
        paddingLeft:moderateScale(20)
       }}>
         <Text style={{color:'white',fontSize:scale(17)}}>Near by you</Text>
         <Text style={{color:'white',fontSize:scale(13),marginTop:moderateVerticalScale(5),
        marginBottom:moderateVerticalScale(10)}}>Salons near you </Text>
   

   
   </View>
      
   <Map allSalons={allSalons} permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
      location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
   />

      
  
  </SafeAreaView>
  )
}