import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { StyleSheet } from "react-native";
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  view1: {
    justifyContent: "center",
    alignItems: "center",
  },
  imgStyle: {
    height: moderateScale(200),
    width: "100%",
  },

  signupTextStyle: {
    fontSize: scale(22),
    color: "grey",
  },
  view2: {
    paddingHorizontal: moderateScale(24),
    paddingVertical:moderateVerticalScale(15)
   
  },

  bottomView: {
   
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom:moderateVerticalScale(10)
   
  },
});
export default styles;
