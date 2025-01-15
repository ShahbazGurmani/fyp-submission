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
  moderateVerticalScale,
  scale,
} from "react-native-size-matters";

export default function CustomizedTextInput({
  label,
  value,
  placeholder,
  onChangeText = () => {},
  inputStyle = {},
  containerStyle = {},
  labelStyle = {},
  textInputStyle = {},
  rightIcon,
  leftIcon,
  onPressRight,
  onPressLeft,
  ...props
}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={[styles.labelStyle, labelStyle]}>{label}</Text>}
      <View style={[styles.inputWrapper, inputStyle]}>
        {leftIcon && (
          <TouchableOpacity onPress={onPressLeft} style={styles.iconContainer}>
            <Image source={leftIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        )}
        <TextInput
          placeholder={placeholder}
          onChangeText={onChangeText}
          style={[styles.textInputStyle, textInputStyle]}
          value={value}
          {...props}
        />
        {rightIcon && (
          <TouchableOpacity onPress={onPressRight} style={styles.iconContainer}>
            <Image source={rightIcon} style={styles.iconStyle} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateVerticalScale(20),
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "grey",
    borderRadius: moderateScale(5),
  },
  textInputStyle: {
    flex: 1,
    paddingVertical: moderateVerticalScale(8),
    fontSize: scale(16),
    color: "black",
  },
  labelStyle: {
    fontSize: scale(14),
    marginBottom: moderateVerticalScale(4),
    color: "grey",
  },
  iconContainer: {
    padding: moderateScale(5),
  },
  iconStyle: {
    width: moderateScale(20),
    height: moderateScale(20),
    resizeMode: "contain",
  },
});
