import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from "react-native";
import React from "react";
import {
  moderateScale,
  
  scale,
} from "react-native-size-matters";
import color from '../constants/color';

export default function CustomizedButton({
  btnText,
  btnStyle = {},
  onPress = () => {},
}) {
  return (
    <View>
      <TouchableOpacity
        onPress={onPress}
        style={{ ...styles.btnStyle, ...btnStyle }}
      >
        <Text style={styles.btnTextStyle}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  btnStyle: {
    height: moderateScale(48),
    borderRadius: moderateScale(4),
    alignItems: "center",
    justifyContent: "center",
    backgroundColor:color.background,
  },
  btnTextStyle: {
    fontSize: scale(12),
    color: "white",

    textTransform: "uppercase",
  },
});
