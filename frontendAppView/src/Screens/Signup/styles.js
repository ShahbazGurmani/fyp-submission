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
    height: moderateScale(220),
    width: "100%",
  },

  signupTextStyle: {
    fontSize: scale(22),
    color: "grey",
  },
  view2: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: 10,
  },

  bottomView: {
    flex: 0.5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop:10
  },
});
export default styles;
