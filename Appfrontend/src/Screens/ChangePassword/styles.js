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

  mainTextStyle: {
    marginTop: moderateVerticalScale(50),
    fontSize: scale(22),
    color: "grey",
  },
  view2: {
    paddingHorizontal: moderateScale(24),
    paddingVertical: 44,
  },
});
export default styles;
