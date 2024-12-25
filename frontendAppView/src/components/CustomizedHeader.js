import { View, Text } from 'react-native'
import React from 'react'
import SearchBar from './SearchBar'

export default function CustomizedHeader({heading}) {
  return (
    <View style = {{justifyContent:'center'}}>
        <Text style = {{color:'white',fontWeight:'700',marginBottom:30}}>{heading}</Text>
      <View style={{marginRight:10,marginLeft:0}}>
      <SearchBar/>
      </View>
    </View>
  )
}