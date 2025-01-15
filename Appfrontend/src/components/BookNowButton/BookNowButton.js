import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import CustomizedButton from '../CustomizedButton'
import color from '../../constants/color'
import { moderateVerticalScale,moderateScale } from 'react-native-size-matters'

export default function BookNowButton() {
  return (
    <View style={{padding:moderateScale(20),position:'fixed',bottom:10,width:'100%',zIndex:1}}>
       <CustomizedButton btnText="Choose Stylist" btnStyle={{ borderRadius: moderateScale(100),
    }}/>
    </View>
  )
}