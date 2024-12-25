import { View, Text , TouchableOpacity,StyleSheet, SafeAreaView,Image,TextInput} from 'react-native'
import React,{ forwardRef } from 'react'
import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import imagePath from '../constants/imagePath';
import CustomizedTextInput from './CustomizedTextInput';
import {MagnifyingGlassIcon,StarIcon,MicrophoneIcon} from  "react-native-heroicons/outline";
import color from '../constants/color';

export default function SearchBar({placeholder,containerStyle = {},onFocus,value,onChangeText,ref}) {
  return (
    <View style={[styles.container,containerStyle]}>

    <View  style={styles.innerView} >

             <View style={styles.search}>
                       <TextInput style={styles.inlineStyle} 
           placeholder={placeholder}
           onFocus={onFocus}
           value={value}
           onChangeText={onChangeText}
           ref={ref}
           /> 
                       <MagnifyingGlassIcon size={22} color={color.textColor}/>
    
             </View>
               
            

      </View>
     
    </View>
  )
}
const styles = StyleSheet.create({
container:{
        
  },

innerView:{ width:'95%',justifyContent:'space-between',flexDirection:'row',

alignItems:'center',paddingLeft:moderateScale(12)
,backgroundColor:'white',borderRadius: moderateScale(10),borderWidth:1,borderColor:'white'

},
search:{flexDirection:'row',  alignItems:'center',
              
     
},
inlineStyle:{  paddingVertical: moderateVerticalScale(8),
    fontSize: scale(16),marginLeft:moderateScale(5),
    width:'90%'
    
            },
})