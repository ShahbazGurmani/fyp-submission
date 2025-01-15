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
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { RFValue } from "react-native-responsive-fontsize";
export default function NearBy({allSalons,permissionStatus,setPermissionStatus,location

  ,setLocation,address,setAddress
}) {
  
  return (
    <SafeAreaView style={{flex:1}}>
     
    <View style={{
       justifyContent:'center',
       backgroundColor:color.background,
       paddingVertical:wp(11),
       borderBottomEndRadius: wp(20),
        paddingLeft:wp(8)
       }}>
         <Text style={{color:'white',fontSize:RFValue(17)}}>Near by you</Text>
         <Text style={{color:'white',fontSize:RFValue(14),marginTop:hp(1),
        marginBottom:hp(1)}}>Salons near you </Text>
   

   
   </View>
      
   <Map allSalons={allSalons} permissionStatus={permissionStatus} setPermissionStatus={setPermissionStatus}
      location={location} setLocation = {setLocation} address ={address} setAddress={setAddress}
   />

      
  
  </SafeAreaView>
  )
}