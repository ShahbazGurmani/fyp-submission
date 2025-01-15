import {
  scale,
  verticalScale,
  moderateScale,
  moderateVerticalScale,
} from "react-native-size-matters";
import { StyleSheet } from "react-native";
import color from "../../constants/color";
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

  loginTextStyle: {
    fontSize: scale(22),
    color: 'grey',
  },
  view2: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: moderateVerticalScale(14)
  },

  forgotPasswordStyle: {
    alignSelf: "flex-end",
    marginVertical: moderateVerticalScale(24),
  },
  bottomView: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default styles;
