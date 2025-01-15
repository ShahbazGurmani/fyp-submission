import { View, Text,Image,StyleSheet } from 'react-native'
import React from 'react'

import splash from './splash/splash.png'
export default function SplashScreenView() {
  return (
    <View style = {styles.container}>
        
      <Image source={splash} style={styles.image}/>
    </View>
  )
}
    const styles = StyleSheet.create({

        container:{
            flex:.8,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor:"white"
        },
        image:{
            
            width:200,
            height:200,
            resizeMode:"cover"
        }
    })